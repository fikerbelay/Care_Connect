// CARE CONNECT - Frontend JavaScript (API Calls)

// API Base URL which should be Changed to your server URL
const API_BASE = 'http://localhost/care-connect/backend/api.php';

// ============================================================
// SEARCH HOSPITALS

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchHospitals();
        });
    }

    // Admin form if on admin page
    const addHospitalForm = document.getElementById('addHospitalForm');
    if (addHospitalForm) {
        addHospitalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addHospital();
        });
        loadAdminData();
    }

    // Login/Logout buttons
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simple demo login - redirects to admin
            window.location.href = 'admin.html';
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});

// ============================================================
// SEARCH HOSPITALS

async function searchHospitals() {
    const symptoms = document.getElementById('symptoms').value;
    const budget = document.getElementById('budget').value;
    const location = document.getElementById('location').value;

    if (!symptoms || !budget || !location) {
        alert('Please fill in all fields');
        return;
    }

    const resultsDiv = document.getElementById('results');
    const resultsList = document.getElementById('resultsList');

    // Show loading
    resultsDiv.style.display = 'block';
    resultsList.innerHTML = '<p>🔍 Searching for hospitals...</p>';

    try {
        const response = await fetch(`${API_BASE}?action=search&symptoms=${encodeURIComponent(symptoms)}&budget=${budget}&location=${encodeURIComponent(location)}`);

        const data = await response.json();

        if (data.status === 'success' && data.data.length > 0) {
            let html = '';
            data.data.forEach((hospital, index) => {
                const rank = index + 1;
                const stars = getStars(hospital.rating);
                html += `
                    <div class="result-card">
                        <h4>#${rank} ${hospital.name}</h4>
                        <span class="hospital-specialty">${hospital.specialty}</span>
                        <p class="hospital-location">📍 ${hospital.location}</p>
                        <p> <span class="hospital-price">${hospital.price_range || 'N/A'}</span></p>
                        <p>${stars} (${hospital.rating || 'No ratings'})</p>
                        <p> ${hospital.services || 'General services available'}</p>
                        <p> ${hospital.contact_phone || 'Contact hospital directly'}</p>
                        <button class="btn-secondary" onclick="requestAppointment(${hospital.hospital_id})">📅 Request Appointment</button>
                    </div>
                `;
            });
            resultsList.innerHTML = html;
        } else {
            resultsList.innerHTML = `
                <div class="result-card" style="border-left-color: #f39c12;">
                    <h4> No hospitals found</h4>
                    <p>Try adjusting your budget, location, or symptoms.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        resultsList.innerHTML = '<p> Something went wrong. Please try again.</p>';
    }
}

// ============================================================
// REQUEST APPOINTMENT

async function requestAppointment(hospitalId) {
    const patientName = prompt('Enter your full name:');
    if (!patientName) return;

    const date = prompt('Enter appointment date (YYYY-MM-DD):');
    if (!date) return;

    const reason = prompt('Reason for appointment:');

    try {
        const response = await fetch(`${API_BASE}?action=request_appointment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hospital_id: hospitalId,
                patient_name: patientName,
                date: date,
                reason: reason || 'General consultation'
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert(' Appointment requested successfully!');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(' Something went wrong. Please try again.');
    }
}

// ============================================================
// ADMIN FUNCTIONS

async function addHospital() {
    const name = document.getElementById('hospitalName').value;
    const location = document.getElementById('hospitalLocation').value;
    const specialty = document.getElementById('hospitalSpecialty').value;
    const services = document.getElementById('hospitalServices').value;
    const price = document.getElementById('hospitalPrice').value;
    const phone = document.getElementById('hospitalPhone').value;

    if (!name || !location || !specialty) {
        alert('Please fill in Name, Location, and Specialty');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}?action=add_hospital`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, location, specialty, services, price, phone
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert(' Hospital added successfully!');
            document.getElementById('addHospitalForm').reset();
            loadAdminData();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
}

async function loadAdminData() {
    await loadHospitals();
    await loadAppointments();
}

async function loadHospitals() {
    const container = document.getElementById('hospitalList');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}?action=get_hospitals`);
        const data = await response.json();

        if (data.status === 'success' && data.data.length > 0) {
            let html = '';
            data.data.forEach(h => {
                html += `
                    <div class="hospital-item">
                        <div>
                            <strong>${h.name}</strong>
                            <br><small>${h.location} | ${h.specialty}</small>
                        </div>
                        <div>
                            <button class="btn-danger" onclick="deleteHospital(${h.hospital_id})">🗑️</button>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p>No hospitals added yet.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>❌ Failed to load hospitals.</p>';
    }
}

async function loadAppointments() {
    const container = document.getElementById('appointmentList');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}?action=get_appointments`);
        const data = await response.json();

        if (data.status === 'success' && data.data.length > 0) {
            let html = '';
            data.data.forEach(a => {
                const statusClass = `status-${a.status}`;
                html += `
                    <div class="appointment-item">
                        <strong>${a.patient_name}</strong> → ${a.hospital_name}
                        <br><small>📅 ${a.appointment_date} at ${a.appointment_time}</small>
                        <br><span class="${statusClass}">${a.status.toUpperCase()}</span>
                        <br>
                        <button class="btn-success" onclick="updateAppointment(${a.appointment_id}, 'confirmed')">✅ Confirm</button>
                        <button class="btn-danger" onclick="updateAppointment(${a.appointment_id}, 'declined')">❌ Decline</button>
                    </div>
                `;
            });
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p>No pending appointments.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p> Failed to load appointments.</p>';
    }
}

async function deleteHospital(hospitalId) {
    if (!confirm('Are you sure you want to delete this hospital?')) return;

    try {
        const response = await fetch(`${API_BASE}?action=delete_hospital`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hospital_id: hospitalId })
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('Hospital deleted successfully!');
            loadHospitals();
        } else {
            alert( data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
}

async function updateAppointment(appointmentId, status) {
    try {
        const response = await fetch(`${API_BASE}?action=update_appointment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                appointment_id: appointmentId,
                status: status
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert(`Appointment ${status}!`);
            loadAppointments();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
}

// ============================================================
// HELPER FUNCTIONS

function getStars(rating) {
    const num = parseFloat(rating) || 0;
    const full = Math.floor(num);
    const half = num - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
