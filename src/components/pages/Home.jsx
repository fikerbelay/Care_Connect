import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ethiopianHospitals = [
  {
    id: 1,
    name: "Tikur Anbessa Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "General Medicine & Surgery",
    services: "Emergency, Surgery, Internal Medicine, Pediatrics, Oncology",
    rating: 4.7,
    type: "Public",
    available: true,
  },
  {
    id: 2,
    name: "St. Paul's Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "Cardiology & Neurology",
    services: "Heart Surgery, Stroke Care, Neurology, Radiology",
    rating: 4.6,
    type: "Public",
    available: true,
  },
  {
    id: 3,
    name: "Yekatit 12 Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "Maternity & Pediatrics",
    services: "Prenatal Care, Delivery, Postnatal, Child Care",
    rating: 4.5,
    type: "Public",
    available: true,
  },
  {
    id: 4,
    name: "Kadisco General Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "General Surgery",
    services: "Surgery, Orthopedics, Urology, ENT",
    rating: 4.3,
    type: "Private",
    available: true,
  },
  {
    id: 5,
    name: "Bethzatha Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "Ophthalmology",
    services: "Eye Surgery, Cataract, Glaucoma, Retina Care",
    rating: 4.6,
    type: "Private",
    available: true,
  },
  {
    id: 6,
    name: "Zewditu Memorial Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "Internal Medicine",
    services: "General Medicine, Diabetes, Hypertension, Chronic Disease",
    rating: 4.4,
    type: "Public",
    available: true,
  }
];

function Home() {
  const navigate = useNavigate();

  // 🔐 Redirect to login if not authenticated
  const handleAction = (action, target) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login', { state: { from: window.location.pathname, action } });
      return;
    }
    // If logged in, proceed
    if (target) {
      navigate(target);
    } else if (action === 'hospital') {
      // handled by the hospital card click
    }
  };

  const handleHospitalClick = (hospitalId) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/hospitals', action: `view-hospital-${hospitalId}` } });
      return;
    }
    navigate(`/hospital/${hospitalId}`);
  };

  // Wrapper for any Link that needs to check login
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login', { state: { from: window.location.pathname, action: target } });
      return;
    }
    navigate(target);
  };

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="tag">Trusted Healthcare</span>
              <h1>
                Healthcare, <br /><span>Made Simple.</span>
              </h1>
              <p>
                Find trusted hospitals, book appointments, and manage your healthcare
                from one secure platform.
              </p>
              <div className="hero-buttons">
                {/* Book Appointment - redirects to login */}
                <button
                  className="btn-primary-hero"
                  onClick={() => handleAction('book-appointment', '/appointments')}
                >
                  <i className="fas fa-calendar-check"></i> Book Appointment
                </button>
                {/* Find Hospitals - redirects to login */}
                <button
                  className="btn-secondary-hero"
                  onClick={() => handleAction('find-hospitals', '/hospitals')}
                >
                  <i className="fas fa-search"></i> Find Hospitals
                </button>
              </div>
            </div>

            <div className="hero-illustration">
              <div className="illustration-box">
                <i className="fas fa-heartbeat main-icon"></i>

                <div className="floating-card floating-card-1">
                  <div className="fc-icon green">
                    <i className="fas fa-check"></i>
                  </div>
                  <div className="fc-text">
                    Appointment Confirmed
                    <small>Tomorrow · 10:30 AM</small>
                  </div>
                </div>

                <div className="floating-card floating-card-2">
                  <div className="fc-icon blue">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="fc-text">
                    12 Available
                    <small>Nearby Hospitals</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK ACTIONS ===== */}
      <section className="quick-actions">
        <div className="container">
          <div className="quick-actions-grid">
            {/* Find Hospitals */}
            <div
              className="quick-action-card"
              onClick={() => handleAction('find-hospitals', '/hospitals')}
            >
              <span className="qa-icon">🏥</span>
              <h3>Find Hospitals</h3>
              <p>Search hospitals nearby</p>
            </div>
            {/* Book Appointment */}
            <div
              className="quick-action-card"
              onClick={() => handleAction('book-appointment', '/appointments')}
            >
              <span className="qa-icon">📅</span>
              <h3>Book Appointment</h3>
              <p>Choose your doctor</p>
            </div>
            {/* Emergency Contacts */}
            <div
              className="quick-action-card"
              onClick={() => handleAction('emergency', '/emergency')}
            >
              <span className="qa-icon">🚑</span>
              <h3>Emergency Contacts</h3>
              <p>Immediate assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED HOSPITALS ===== */}
      <section className="hospitals-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Hospitals</h2>
            {/* View All - redirects to login */}
            <button
              className="view-all-link"
              onClick={() => handleAction('view-all-hospitals', '/hospitals')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              View All →
            </button>
          </div>

          <div className="hospitals-grid">
            {ethiopianHospitals.map(hospital => (
              <div
                key={hospital.id}
                className="hospital-card"
                onClick={() => handleHospitalClick(hospital.id)}
              >
                <div className="hospital-card-image">
                  <i className="fas fa-hospital-medical"></i>
                  <span className="hospital-card-badge">{hospital.type}</span>
                </div>
                <div className="hospital-card-content">
                  <h3 className="hospital-name">{hospital.name}</h3>
                  <p className="hospital-location">
                    <i className="fas fa-map-marker-alt"></i> {hospital.location}
                  </p>
                  <div className="hospital-rating">
                    {'★'.repeat(Math.floor(hospital.rating))}
                    {'☆'.repeat(5 - Math.floor(hospital.rating))}
                    <span> {hospital.rating}</span>
                  </div>
                  <span className="hospital-specialty">{hospital.specialty}</span>
                  <div className="hospital-card-footer">
                    <span className="availability">
                      <i className="fas fa-circle"></i> Open 24 Hours
                    </span>
                    <button className="btn-view" onClick={(e) => {
                      e.stopPropagation();
                      handleHospitalClick(hospital.id);
                    }}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATISTICS ===== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">🏥</span>
              <span className="stat-number">150+</span>
              <span className="stat-label">Hospitals</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">👨‍⚕️</span>
              <span className="stat-number">500+</span>
              <span className="stat-label">Doctors</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">❤️</span>
              <span className="stat-number">12k+</span>
              <span className="stat-label">Patients Helped</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🕐</span>
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why-choose">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose CareConnect?</h2>
            <p>We make healthcare simple, transparent, and accessible for everyone.</p>
          </div>
          <div className="why-choose-grid">
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-shield-alt"></i></div>
              <h4>Verified Hospitals</h4>
              <p>All hospitals meet Ethiopian healthcare quality standards and are verified by our team.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-clock"></i></div>
              <h4>Reduced Wait Times</h4>
              <p>Book appointments online and skip the long queues at hospitals.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-star"></i></div>
              <h4>Patient Reviews</h4>
              <p>Real reviews from real patients to help you make informed decisions.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-phone-alt"></i></div>
              <h4>24/7 Support</h4>
              <p>Our dedicated support team is always ready to help you find the care you need.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-heart"></i></div>
              <h4>Compassionate Care</h4>
              <p>We prioritize your health and wellbeing above everything else.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><i className="fas fa-money-bill-wave"></i></div>
              <h4>Transparent Pricing</h4>
              <p>Clear pricing information so you know exactly what to expect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Patients Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <blockquote>"Booking my appointment took less than two minutes. The process was incredibly smooth."</blockquote>
              <div className="author">
                <div className="author-avatar">EK</div>
                <div className="author-info">
                  <h4>Emebet K.</h4>
                  <span>Addis Ababa</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <blockquote>"I found the right specialist within minutes. Highly recommended for anyone in Addis."</blockquote>
              <div className="author">
                <div className="author-avatar">TM</div>
                <div className="author-info">
                  <h4>Tsion M.</h4>
                  <span>Addis Ababa</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★☆</div>
              <blockquote>"The transparent pricing helped me choose a hospital within my budget. Great service!"</blockquote>
              <div className="author">
                <div className="author-avatar">DG</div>
                <div className="author-info">
                  <h4>Daniel G.</h4>
                  <span>Addis Ababa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;