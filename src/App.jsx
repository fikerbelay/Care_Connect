import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home.jsx';

function About() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ color: '#E8EEE0' }}>About CareConnect</h1>
      <p style={{ color: '#B5C8A3' }}>Connecting Ethiopians with quality healthcare.</p>
    </div>
  );
}

function Hospitals() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ color: '#E8EEE0' }}>All Hospitals</h1>
      <p style={{ color: '#B5C8A3' }}>Browse all partner hospitals.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ color: '#E8EEE0' }}>Contact Us</h1>
      <p style={{ color: '#B5C8A3' }}>Get in touch with our team.</p>
    </div>
  );
}

function Login() {
  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ color: '#E8EEE0', textAlign: 'center' }}>Login</h1>
      <p style={{ color: '#B5C8A3', textAlign: 'center' }}>Access your account.</p>
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
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/hospitals">Find Hospital</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
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
            <p>Helping people access healthcare, simply.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <p>
              <i className="fas fa-envelope"></i> fiker23sw@gmail.com
            </p>
            <div className="social-links">
              <a href="https://github.com/fikerbelay" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CareConnect · Built with ❤️ by Fiker Belay</p>
        </div>
      </div>
    </footer>
  );
}

function Services() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ color: '#E8EEE0' }}>Our Services</h1>
      <p style={{ color: '#B5C8A3' }}>Learn about what we offer.</p>
    </div>
  );
}

function Register() {
  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ color: '#E8EEE0', textAlign: 'center' }}>Register</h1>
      <p style={{ color: '#B5C8A3', textAlign: 'center' }}>Create your account.</p>
    </div>
  );
}

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;