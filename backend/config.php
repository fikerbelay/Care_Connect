<?php
// CARE CONNECT - Database Configuration

$host = 'localhost';
$dbname = 'careconnect';
$username = 'root';      // should be changed to your MySQL username
$password = '';          // also chhange to your MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Helper function to return JSON responses
function sendResponse($status, $data = null, $message = null) {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => $status,
        'data' => $data,
        'message' => $message
    ]);
    exit;
}
?>
