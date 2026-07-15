#  CareConnect - Smart Hospital Matching System

## Overview

CareConnect helps patients find the right hospital based on their symptoms, budget, and location. Patients enter what they need, and the system shows matching hospitals ranked by relevance.

Built as a university project for Object-Oriented System Analysis & Design (OOSAD) and Software Project Management (SPM) courses at Unity University.

---

## Features

- Search hospitals by symptoms, budget, and location
- Ranked results showing the best matches first
- Request appointments directly from the platform
- Hospital admin dashboard to manage listings and appointments
- Responsive design works on mobile and desktop
- Simple and easy to use - no login required for patients

---

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: PHP
- Database: MySQL
- Version Control: Git & GitHub

---

## Project Structure

care-connect/
├── index.html          # Patient search page

├── admin.html          # Hospital admin dashboard

├── style.css           # All styling

├── script.js           # Frontend JavaScript (API calls)

├── backend/

│   ├── config.php      # Database connection settings

│   └── api.php         # All API endpoints

└── README.md           # This file

---

## Installation

### Requirements
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (XAMPP, WAMP, MAMP, or Apache/Nginx)

### Step 1: Clone or Download

git clone https://github.com/fikerbelay/care-connect.git

Or download the ZIP and extract it.

### Step 2: Move to Web Server

Move the folder to your web server directory:

Linux: /var/www/html/care-connect/
Windows: C:\xampp\htdocs\care-connect\
Mac: /Applications/MAMP/htdocs/care-connect/

### Step 3: Create Database

Open phpMyAdmin or MySQL command line and run:

CREATE DATABASE careconnect;
USE careconnect;

Then import the database structure from the SQL section below.

### Step 4: Configure Database

Open backend/config.php and update:

$username = 'root';   // Your MySQL username
$password = '';       // Your MySQL password

### Step 5: Run

Open your browser and go to:

http://localhost/care-connect/

---

## Database Setup

Copy and run this SQL in phpMyAdmin or MySQL:

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

INSERT INTO hospitals (name, location, specialty, services, price_range, contact_phone, rating) VALUES
('Yekatit 12 Hospital', 'Addis Ababa', 'General Medicine', 'Emergency, Surgery, Maternity', '500-2000 ETB', '+251911111111', 4.2),
('St. Paul\'s Hospital', 'Addis Ababa', 'Cardiology', 'Heart Surgery, Cardiac Care', '1000-5000 ETB', '+251922222222', 4.5),
('Tikur Anbessa Hospital', 'Addis Ababa', 'Neurology', 'Brain Surgery, Stroke Care', '1500-6000 ETB', '+251933333333', 4.0),
('Zewditu Hospital', 'Addis Ababa', 'Maternity', 'Prenatal, Delivery, Postnatal', '300-1500 ETB', '+251944444444', 4.3),
('Bethel Hospital', 'Addis Ababa', 'Pediatrics', 'Child Care, Vaccinations', '200-1000 ETB', '+251955555555', 3.8);

INSERT INTO users (full_name, email, password_hash, role, phone, location) VALUES
('Fiker Belay', 'fiker@example.com', 'demohash', 'patient', '+251924310404', 'a.a, a.a');

---

## API Endpoints

Action                    Method   Description
search                    GET      Search hospitals by symptoms, budget, location
get_hospitals             GET      Get all hospitals
add_hospital              POST     Add a new hospital
delete_hospital           POST     Delete a hospital
request_appointment       POST     Request an appointment
get_appointments          GET      Get all appointments
update_appointment        POST     Confirm or decline an appointment

Example Search:

http://localhost/care-connect/backend/api.php?action=search&symptoms=fever&budget=500&location=Addis

---

## Matching Algorithm

Hospitals are ranked using three factors:

- Medical Specialty Match (40%): Does the hospital treat this condition?
- Budget Alignment (35%): Is the hospital within the patient's budget?
- Geographic Proximity (25%): How close is the hospital?

---

## Screenshots

Patient Search Page:

- Enter symptoms, budget, and location
- Click search to see ranked results
- Request appointments with one click

Admin Dashboard:

- Add new hospitals
- Delete existing hospitals
- View and manage appointment requests

---

## Author

Fiker Belay Tsegaye

- Email: fiker23sw@gmail.com
- LinkedIn: linkedin.com/in/fiker-belay

