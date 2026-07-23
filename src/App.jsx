import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';

function About() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ color: '#1E293B' }}>About CareConnect</h1>
      <p>Connecting Ethiopians with quality healthcare.</p>
    </div>
  );
}

function Hospitals() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ color: '#1E293B' }}>All Hospitals</h1>
      <p>Browse all partner hospitals.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="container" style={{ padding: '40px' }}>
      <h1 style={{ color: '#1E293B' }}>Contact Us</h1>
      <p>Get in touch with our team.</p>
    </div>
  );
}

function Login() {
  return (
    <div className="container" style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ color: '#1E293B', textAlign: 'center' }}>Login</h1>
      <p style={{ textAlign: 'center' }}>Access your account.</p>
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>
            <i className="fas fa-heartbeat"></i> CareConnect
          </h1>
          <p>Find the right hospital for your needs</p>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/hospitals">Hospitals</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3><i className="fas fa-heartbeat"></i> CareConnect</h3>
            <p>Your trusted partner in finding quality healthcare across Ethiopia.</p>
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
              <li><a href="#">Hospital Search</a></li>
              <li><a href="#">Appointment Booking</a></li>
              <li><a href="#">Emergency Care</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <p>
              <i className="fas fa-envelope"></i> fiker23sw@gmail.com
            </p>
            <p>
              <i className="fab fa-github"></i> github.com/fikerbelay
            </p>
            <p style={{ marginTop: '8px', fontSize: '13px', opacity: '0.7' }}>
              Built with ❤️ by Fiker Belay
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CareConnect - Connecting Ethiopians to Quality Healthcare</p>
          <p style={{ marginTop: '4px' }}>Developed by Fiker Belay</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container" style={{ padding: '0 24px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;