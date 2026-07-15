CareConnect - Smart Hospital Matching System

##  Overview

CareConnect is a smart hospital matching system designed to help patients find the right healthcare facility based on their symptoms, budget, and location. It was originally built as a university project for Object-Oriented System Analysis & Design (OOSAD) and Software Project Management (SPM) courses.

##  Features

- **Patient Search** - Search hospitals by symptoms, budget, and location
- **Ranked Results** - Hospitals ranked by relevance (medical fit, cost, distance)
- **Appointment Requests** - Request appointments directly from the platform
- **Admin Dashboard** - Add/delete hospitals, manage appointments
- **Responsive Design** - Works on mobile and desktop
- **No Login Required** - Simple and accessible

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | PHP |
| Database | MySQL |
| Version Control | Git & GitHub |

## 📂 Project Structure
care-connect/
├── index.html # Patient search page
├── admin.html # Hospital admin dashboard
├── style.css # Styling
├── script.js # Frontend JavaScript (API calls)
├── backend/
│ ├── config.php # Database connection
│ ├── api.php # All API endpoints
│ └── ... # Other backend files
└── README.md # Project documentation


##  Installation

### 1. Requirements
- PHP 7.4+
- MySQL 5.7+
- Web server (Apache/Nginx/XAMPP/WAMP)

### 2. Setup

``' bash
# Clone the repository
git clone https://github.com/fikerbelay/care-connect.git

# Move to your web server directory
mv care-connect /var/www/html/  # Linux
# OR
# C:\xampp\htdocs\care-connect  # Windows

# Import database
mysql -u root -p < database.sql """
3. Configure Database
Edit backend/config.php with your MySQL credentials:

php
$username = 'root';   // Your MySQL username
$password = '';       // Your MySQL password
4. Run
Navigate to http://localhost/care-connect/ in your browser. ``` 

 API Endpoints
Endpoint	Method	Description
?action=search&symptoms=X&budget=Y&location=Z	GET	Search hospitals
?action=get_hospitals	GET	Get all hospitals
?action=add_hospital	POST	Add new hospital
?action=delete_hospital	POST	Delete hospital
?action=request_appointment	POST	Request appointment
?action=get_appointments	GET	Get all appointments
?action=update_appointment	POST	Update appointment status

🎯 Matching Algorithm

Hospitals are ranked using a weighted scoring system:

Medical Specialty Match (40%) - Patient symptoms match hospital specialty

Budget Alignment (35%) - Hospital costs within patient budget

Geographic Proximity (25%) - Distance from patient location


---

##  Summary: What Each File Does

| **File** | **Purpose** |
|----------|-------------|
| `index.html` | Patient search interface |
| `admin.html` | Hospital admin dashboard |
| `style.css` | All styling (responsive, clean design) |
| `script.js` | All frontend logic, API calls, DOM manipulation |
| `backend/config.php` | Database connection configuration |
| `backend/api.php` | All PHP API endpoints (search, CRUD, appointments) |
| `README.md` | Project documentation for GitHub |


📝 License
This project was created for educational purposes at Unity University.

👤 Author
Fiker Belay Tsegaye
LinkedIn: linkedin.com/in/fiker-belay




