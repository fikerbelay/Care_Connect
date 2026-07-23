import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3><i className="fas fa-hospital"></i> CareConnect</h3>
            <p>Your trusted partner in finding the right healthcare. NHS-approved and committed to patient care.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
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
              <li><a href="#">Specialist Referrals</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p><i className="fas fa-phone"></i> +44 20 1234 5678</p>
            <p><i className="fas fa-envelope"></i> info@careconnect.co.uk</p>
            <p><i className="fas fa-map-marker-alt"></i> London, UK</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CareConnect - NHS-Approved Hospital Matching System</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;