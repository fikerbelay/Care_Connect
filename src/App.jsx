import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/pages/Home.jsx';

// ============ LOGIN PAGE ============
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple demo login - redirect to home
    alert('Login successful! (Demo)');
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to access your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-auth">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ REGISTER PAGE ============
function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Account created! (Demo) Please login.');
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join CareConnect today</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>

            <button type="submit" className="btn-auth">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ PAGES ============
function About() {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: '#1A1A1A' }}>About CareConnect</h1>
      <p style={{ color: '#4A4A4A' }}>Connecting Ethiopians with quality healthcare.</p>
    </div>
  );
}

function Hospitals() {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: '#1A1A1A' }}>All Hospitals</h1>
      <p style={{ color: '#4A4A4A' }}>Browse all partner hospitals.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: '#1A1A1A' }}>Contact Us</h1>
      <p style={{ color: '#4A4A4A' }}>Get in touch with our team.</p>
    </div>
  );
}

function Services() {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ color: '#1A1A1A' }}>Our Services</h1>
      <p style={{ color: '#4A4A4A' }}>Learn about what we offer.</p>
    </div>
  );
}

// ============ HEADER ============
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
          <Link to="/hospitals">Find Hospital</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="login-btn">Login</Link>
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
            <p style={{ marginTop: '8px', opacity: '0.5' }}>
              Simple. Transparent. Reliable.
            </p>
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
              <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
              fiker23sw@gmail.com
            </p>
            <p>
              <i className="fab fa-github" style={{ marginRight: '8px' }}></i>
              github.com/fikerbelay
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
            <p style={{ marginTop: '12px', fontSize: '13px', opacity: '0.4' }}>
              Built with ❤️ by Fiker Belay
            </p>
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
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;