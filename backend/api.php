<?php
// CARE CONNECT - REST API

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

$action = $_GET['action'] ?? '';

// SEARCH HOSPITALS (GET)

if ($action === 'search') {
    $symptoms = $_GET['symptoms'] ?? '';
    $budget = floatval($_GET['budget'] ?? 0);
    $location = $_GET['location'] ?? '';

    if (empty($symptoms) || $budget <= 0 || empty($location)) {
        sendResponse('error', null, 'Please provide symptoms, budget, and location');
    }

    // Simple matching: find hospitals by specialty keyword in symptoms
    $stmt = $pdo->prepare("
        SELECT * FROM hospitals 
        WHERE (specialty LIKE :symptom1 OR services LIKE :symptom2)
        AND location LIKE :location
        ORDER BY rating DESC
        LIMIT 10
    ");

    $searchTerm = "%$symptoms%";
    $locationTerm = "%$location%";

    $stmt->execute([
        ':symptom1' => $searchTerm,
        ':symptom2' => $searchTerm,
        ':location' => $locationTerm
    ]);

    $results = $stmt->fetchAll();

    // Calculate a simple "score" based on budget matching
    foreach ($results as &$hospital) {
        $score = 0;
        // Budget match: higher score if price_range starts with <= budget
        if ($hospital['price_range']) {
            // Try to extract max price from price_range (e.g., "500-2000 ETB" -> 2000)
            preg_match('/(\d+)\s*-\s*(\d+)/', $hospital['price_range'], $matches);
            if (isset($matches[2]) && $budget >= floatval($matches[2])) {
                $score += 40; // Budget match = 40 points
            } elseif (isset($matches[1]) && $budget >= floatval($matches[1])) {
                $score += 20; // Partial budget match = 20 points
            }
        }
        // Specialty match = 30 points
        if (stripos($hospital['specialty'], $symptoms) !== false) {
            $score += 30;
        }
        // Rating bonus = up to 10 points
        $score += min($hospital['rating'] * 2, 10);
        $hospital['match_score'] = $score;
    }

    // Sort by match score (descending)
    usort($results, function($a, $b) {
        return $b['match_score'] - $a['match_score'];
    });

    sendResponse('success', $results);
}

// get all hospitals


if ($action === 'get_hospitals') {
    $stmt = $pdo->query("SELECT * FROM hospitals ORDER BY name");
    $results = $stmt->fetchAll();
    sendResponse('success', $results);
}

// ADD HOSPITAL (POST)

if ($action === 'add_hospital') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        sendResponse('error', null, 'Invalid JSON data');
    }

    $name = $data['name'] ?? '';
    $location = $data['location'] ?? '';
    $specialty = $data['specialty'] ?? '';
    $services = $data['services'] ?? '';
    $price = $data['price'] ?? '';
    $phone = $data['phone'] ?? '';

    if (empty($name) || empty($location) || empty($specialty)) {
        sendResponse('error', null, 'Name, Location, and Specialty are required');
    }

    $stmt = $pdo->prepare("
        INSERT INTO hospitals (name, location, specialty, services, price_range, contact_phone)
        VALUES (:name, :location, :specialty, :services, :price, :phone)
    ");

    $stmt->execute([
        ':name' => $name,
        ':location' => $location,
        ':specialty' => $specialty,
        ':services' => $services,
        ':price' => $price,
        ':phone' => $phone
    ]);

    sendResponse('success', ['id' => $pdo->lastInsertId()], 'Hospital added successfully');
}

// DELETE HOSPITAL (POST)

if ($action === 'delete_hospital') {
    $data = json_decode(file_get_contents('php://input'), true);
    $hospitalId = $data['hospital_id'] ?? 0;

    if ($hospitalId <= 0) {
        sendResponse('error', null, 'Invalid hospital ID');
    }

    $stmt = $pdo->prepare("DELETE FROM hospitals WHERE hospital_id = :id");
    $stmt->execute([':id' => $hospitalId]);

    sendResponse('success', null, 'Hospital deleted successfully');
}

// request appointment via post

if ($action === 'request_appointment') {
    $data = json_decode(file_get_contents('php://input'), true);

    $hospitalId = $data['hospital_id'] ?? 0;
    $patientName = $data['patient_name'] ?? '';
    $date = $data['date'] ?? date('Y-m-d');
    $reason = $data['reason'] ?? 'General consultation';

    if ($hospitalId <= 0 || empty($patientName)) {
        sendResponse('error', null, 'Hospital ID and patient name are required');
    }

    // Check if hospital exists
    $checkStmt = $pdo->prepare("SELECT hospital_id FROM hospitals WHERE hospital_id = :id");
    $checkStmt->execute([':id' => $hospitalId]);
    if (!$checkStmt->fetch()) {
        sendResponse('error', null, 'Hospital not found');
    }

    // Create a temporary patient or use existing (for demo)
    $stmt = $pdo->prepare("
        INSERT INTO appointments (patient_id, hospital_id, appointment_date, appointment_time, reason, status)
        VALUES (1, :hospital_id, :date, '09:00:00', :reason, 'pending')
        ");
    $stmt->execute([
        ':hospital_id' => $hospitalId,
        ':date' => $date,
        ':reason' => $reason
    ]);

    sendResponse('success', ['id' => $pdo->lastInsertId()], 'Appointment requested successfully');
}

// ============================================================
// GET APPOINTMENTS
// ============================================================

if ($action === 'get_appointments') {
    $stmt = $pdo->query("
        SELECT a.*, u.full_name as patient_name, h.name as hospital_name
        FROM appointments a
        JOIN users u ON a.patient_id = u.user_id
        JOIN hospitals h ON a.hospital_id = h.hospital_id
        ORDER BY a.created_at DESC
    ");
    $results = $stmt->fetchAll();
    sendResponse('success', $results);
}
// UPDATE APPOINTMENT STATUS (POST)

if ($action === 'update_appointment') {
    $data = json_decode(file_get_contents('php://input'), true);
    $appointmentId = $data['appointment_id'] ?? 0;
    $status = $data['status'] ?? '';

    $validStatuses = ['pending', 'confirmed', 'declined', 'completed'];
    if ($appointmentId <= 0 || !in_array($status, $validStatuses)) {
        sendResponse('error', null, 'Invalid appointment ID or status');
    }

    $stmt = $pdo->prepare("
        UPDATE appointments SET status = :status WHERE appointment_id = :id
    ");
    $stmt->execute([':status' => $status, ':id' => $appointmentId]);

    sendResponse('success', null, "Appointment $status successfully");
}

// DEFAULT - NO ACTION SPECIFIED

sendResponse('error', null, 'Invalid action. Available actions: search, get_hospitals, add_hospital, delete_hospital, request_appointment, get_appointments, update_appointment');
?>        
