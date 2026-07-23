# CareConnect - NHS-Approved Hospital Matching System

<div align="center">

![CareConnect Logo](https://img.shields.io/badge/CareConnect-NHS%20Approved-003087?style=for-the-badge&logo=hospital)
![PHP](https://img.shields.io/badge/PHP-8.0+-777BB4?style=for-the-badge&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1?style=for-the-badge&logo=mysql)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)

**Smart Healthcare Navigation for the UK**

[Features](#-features) • [Installation](#-installation) • [API](#-api-endpoints) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

## 🌟 Overview

CareConnect is a comprehensive hospital matching system that helps patients find the right healthcare facility based on their symptoms, budget, and location. Built with a modern UK medical design and NHS-approved standards, the platform provides intelligent hospital recommendations, appointment booking, and comprehensive healthcare management.

**Built as a university project for Object-Oriented System Analysis & Design (OOSAD) and Software Project Management (SPM) courses at Unity University.**

## ✨ Features

### For Patients
- 🔍 **Smart Hospital Search** - Find hospitals by symptoms, budget, and location
- 📊 **Intelligent Matching** - Ranked results using advanced matching algorithm
- 📅 **Appointment Booking** - Request appointments directly from the platform
- ⭐ **Hospital Ratings** - View and submit hospital feedback
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🔐 **User Authentication** - Secure login and registration system

### For Administrators
- 🏥 **Hospital Management** - Add, edit, and delete hospital listings
- 📋 **Appointment Management** - View and manage appointment requests
- 👥 **User Management** - Manage patient and admin accounts
- 📈 **Analytics Dashboard** - Track platform usage and statistics

### System Features
- 🎨 **UK Medical Design** - Professional NHS-inspired interface
- 🔒 **Role-Based Access** - Secure admin dashboard with authentication
- 🌐 **Multi-Page Navigation** - Home, About, Hospitals, Contact pages
- ⚡ **Loading States** - Smooth user experience with loading indicators
- 🎯 **Modal Dialogs** - Modern form interactions replacing alerts
- 📞 **Contact System** - Professional contact form and emergency information

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Dynamic functionality
- **Font Awesome 6.4.0** - Professional icon library

### Backend
- **PHP 8.0+** - Server-side logic
- **MySQL 5.7+** - Database management
- **PDO** - Secure database connections

### Development Tools
- **Git** - Version control
- **GitHub** - Code hosting and collaboration

## 📁 Project Structure

```
care-connect/
├── index.html              # Patient search page (home)
├── about.html              # About us page
├── hospitals.html          # Popular hospitals listing
├── contact.html            # Contact us page
├── login.html              # User authentication page
├── admin.html              # Hospital admin dashboard
├── style.css               # All styling (UK medical theme)
├── script.js               # Frontend JavaScript (API calls & interactions)
├── backend/
│   ├── config.php          # Database connection settings
│   ├── api.php             # REST API endpoints
│   ├── auth.php            # Authentication middleware
│   └── seed.php            # Database seeding script
├── docs/                   # Full project documentation
│   ├── CareConnect_OOSAD_Report.pdf
│   └── CareConnect_SPM_Report.pdf
└── README.md               # This file
```

## 🚀 Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (XAMPP, WAMP, MAMP, or Apache/Nginx)
- Modern web browser

### Step 1: Clone or Download

```bash
git clone https://github.com/fikerbelay/Care_Connect.git
```

Or download the ZIP and extract it.

### Step 2: Move to Web Server

Move the folder to your web server directory:

**Linux:** `/var/www/html/care-connect/`
**Windows:** `C:\xampp\htdocs\care-connect\`
**Mac:** `/Applications/MAMP/htdocs/care-connect/`

### Step 3: Create Database

Open phpMyAdmin or MySQL command line and run:

```sql
CREATE DATABASE careconnect;
USE careconnect;
```

### Step 4: Import Database Structure

Run the SQL provided in the [Database Setup](#-database-setup) section below.

### Step 5: Configure Database

Open `backend/config.php` and update:

```php
$username = 'root';   // Your MySQL username
$password = '';       // Your MySQL password
```

### Step 6: Seed Database (Optional)

Run the seeding script to populate with dummy data:

```bash
php backend/seed.php
```

### Step 7: Run

Open your browser and navigate to:

```
http://localhost/care-connect/
```

## 💾 Database Setup

Copy and run this SQL in phpMyAdmin or MySQL:

```sql
CREATE DATABASE careconnect;
USE careconnect;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('patient','hospital_admin','system_admin') DEFAULT 'patient',
    phone VARCHAR(20),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospitals (
    hospital_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    services TEXT,
    price_range VARCHAR(50),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    hospital_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason TEXT,
    status ENUM('pending','confirmed','declined','completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(user_id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);

CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    hospital_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(user_id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);
```

## 🔌 API Endpoints

### Authentication
| Action | Method | Description |
|--------|--------|-------------|
| `register` | POST | Register new user |
| `login` | POST | User login |
| `logout` | POST | User logout |
| `get_current_user` | GET | Get current logged-in user |
| `update_profile` | POST | Update user profile |

### Hospital Management
| Action | Method | Description |
|--------|--------|-------------|
| `search` | GET | Search hospitals by symptoms, budget, location |
| `get_hospitals` | GET | Get all hospitals |
| `add_hospital` | POST | Add a new hospital (admin only) |
| `delete_hospital` | POST | Delete a hospital (admin only) |
| `get_hospital_feedback` | GET | Get hospital feedback/ratings |
| `submit_feedback` | POST | Submit hospital feedback |

### Appointment Management
| Action | Method | Description |
|--------|--------|-------------|
| `request_appointment` | POST | Request an appointment |
| `get_appointments` | GET | Get all appointments (admin) |
| `get_my_appointments` | GET | Get current user's appointments |
| `update_appointment` | POST | Confirm or decline an appointment (admin) |

### Example API Calls

**Search Hospitals:**
```
GET /backend/api.php?action=search&symptoms=fever&budget=500&location=London
```

**Login:**
```bash
POST /backend/api.php?action=login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Request Appointment:**
```bash
POST /backend/api.php?action=request_appointment
Content-Type: application/json

{
  "hospital_id": 1,
  "patient_name": "John Doe",
  "date": "2026-05-25",
  "time": "10:00:00",
  "reason": "General consultation"
}
```

## 🧠 Matching Algorithm

Hospitals are ranked using a sophisticated scoring system:

1. **Budget Match (40%)** - Higher score if hospital price range fits patient budget
2. **Specialty Match (30%)** - Points for matching medical specialty
3. **Rating Bonus (up to 30%)** - Additional points for high hospital ratings

The algorithm ensures patients get the most relevant and affordable healthcare options.

## 🎨 Design System

### Color Palette (UK Medical Theme)
- **Primary Blue:** `#005EB8` (NHS Blue)
- **Primary Dark:** `#003087` (NHS Dark Blue)
- **Primary Light:** `#00A9CE` (NHS Light Blue)
- **Success Green:** `#007F3B` (NHS Green)
- **Danger Red:** `#D5281B` (NHS Red)
- **Warning Amber:** `#FFB81C` (NHS Amber)

### Typography
- **Font Family:** Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Headings:** Bold, 24-32px
- **Body:** Regular, 14-16px
- **Small Text:** Regular, 12px

## 🔐 Authentication & Security

### User Roles
- **Patient** - Can search hospitals, book appointments, submit feedback
- **Hospital Admin** - Can manage hospitals and appointments
- **System Admin** - Full system access

### Security Features
- Password hashing using PHP's `password_hash()`
- Session-based authentication
- Role-based access control
- SQL injection prevention using PDO prepared statements
- XSS protection through proper output encoding

## 📸 Screenshots

### Patient Search Page
- Enter symptoms, budget, and location
- View ranked hospital results
- Request appointments with one click
- Modern NHS-inspired design

### Admin Dashboard
- Add new hospitals with detailed information
- Delete existing hospitals
- View and manage appointment requests
- Protected by authentication

### Additional Pages
- **About Us** - Company information and team
- **Hospitals** - Browse popular hospitals with filters
- **Contact** - Professional contact form and emergency information
- **Login** - Secure authentication with social login options

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Default Credentials

After running the seeding script, use these credentials:

**Patient:**
- Email: `fiker@example.com`
- Password: `password123`

**Admin:**
- Email: `admin@careconnect.com`
- Password: `admin123`

**System Admin:**
- Email: `system@careconnect.com`
- Password: `system123`

## 🐛 Known Issues

- Social login (Google/Facebook) is UI only - backend integration required
- Real-time notifications not implemented
- Payment gateway integration needed for actual payments

## 🚧 Future Enhancements

- [ ] Real-time appointment availability
- [ ] SMS/email notifications
- [ ] Payment integration
- [ ] Mobile app development
- [ ] AI-powered symptom analysis
- [ ] Telemedicine integration
- [ ] Multi-language support

## 📄 License

This project is for educational purposes. Built as a university project.

## 👨‍💻 Author

**Fiker Belay Tsegaye**

- 📧 Email: fiker23sw@gmail.com
- 💼 LinkedIn: [linkedin.com/in/fiker-belay](https://linkedin.com/in/fiker-belay)
- 🐙 GitHub: [@fikerbelay](https://github.com/fikerbelay)

## 🙏 Acknowledgments

- Unity University for the opportunity to develop this project
- NHS design guidelines for the professional medical interface
- Font Awesome for the icon library
- The open-source community for valuable resources

---

<div align="center">

**Built with ❤️ for better healthcare access**

[⬆ Back to Top](#-careconnect---nhs-approved-hospital-matching-system)

</div>

