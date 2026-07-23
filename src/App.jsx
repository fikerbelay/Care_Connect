import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import LoginPage from './components/pages/Login.jsx';
import RegisterPage from './components/pages/Register.jsx';
import Services from './components/pages/Services.jsx';
import Hospitals from './components/pages/Hospitals.jsx';
import About from './components/pages/About.jsx';
import Contact from './components/pages/Contact.jsx';
import Profile from './components/pages/Profile.jsx';
import Appointments from './components/pages/Appointments.jsx';
import Emergency from './components/pages/Emergency.jsx';
import HospitalDetail from './components/pages/HospitalDetail.jsx';



// ============ HEADER ============
function Header() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>
            <i className="fas fa-heartbeat"></i> CareConnect
          </h1>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/hospitals">Find Hospital</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {isLoggedIn ? (
            <Link to="/profile" className="login-btn" style={{ background: '#1A1A1A' }}>
              <i className="fas fa-user"></i> {user?.fullName || 'Profile'}
            </Link>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3><i className="fas fa-heartbeat"></i> CareConnect</h3>
            <p>Your trusted partner in finding quality healthcare across Ethiopia.</p>
            <p style={{ marginTop: '8px', opacity: '0.5' }}>Simple. Transparent. Reliable.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/hospitals">Hospitals</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services">Hospital Search</Link></li>
              <li><Link to="/services">Appointment Booking</Link></li>
              <li><Link to="/services">Emergency Care</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <p><i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>fiker23sw@gmail.com</p>
            <p><i className="fab fa-github" style={{ marginRight: '8px' }}></i>github.com/fikerbelay</p>
            <div className="social-links">
              <a href="https://github.com/fikerbelay" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            </div>
            
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CareConnect · Connecting Ethiopians to Quality Healthcare</p>
        </div>
      </div>
    </footer>
  );
}

// ============ APP ============
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/hospital/:id" element={<HospitalDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;