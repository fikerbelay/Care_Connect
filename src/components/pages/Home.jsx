import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Real Ethiopian Hospitals Data (Prices removed from front page)
const ethiopianHospitals = [
  {
    id: 1,
    name: "Black Lion Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "General Medicine & Surgery",
    services: "Emergency, Surgery, Internal Medicine, Pediatrics, Gynecology",
    rating: 4.7,
    type: "Public"
  },
  {
    id: 2,
    name: "St. Paul's Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "Cardiology & Neurology",
    services: "Heart Surgery, Stroke Care, Neurology, Radiology",
    rating: 4.6,
    type: "Public"
  },
  {
    id: 3,
    name: "Yekatit 12 Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "Maternity & Pediatrics",
    services: "Prenatal Care, Delivery, Postnatal, Child Care",
    rating: 4.5,
    type: "Public"
  },
  {
    id: 4,
    name: "Zewditu Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "Internal Medicine",
    services: "General Medicine, Diabetes Care, Hypertension, Chronic Disease",
    rating: 4.4,
    type: "Public"
  },
  {
    id: 5,
    name: "Kadisco General Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "General Surgery",
    services: "Surgery, Orthopedics, Urology, ENT",
    rating: 4.3,
    type: "Private"
  },
  {
    id: 6,
    name: "Addis General Hospital",
    location: "Addis Ababa, Ethiopia",
    specialty: "Orthopedics",
    services: "Bone Surgery, Joint Replacement, Physical Therapy, Sports Medicine",
    rating: 4.5,
    type: "Private"
  }
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const slides = [
    {
      title: "Find the Right Hospital in Ethiopia",
      description: "Search, compare, and book appointments at the best hospitals across Addis Ababa and Ethiopia.",
      cta: "Start Searching",
      ctaLink: "#search"
    },
    {
      title: "Trusted by 50,000+ Ethiopians",
      description: "Join thousands of patients who found quality healthcare through CareConnect.",
      cta: "View Hospitals",
      ctaLink: "#hospitals"
    },
    {
      title: "Your Health, Our Priority",
      description: "Connecting you with top-rated hospitals and doctors for quality, affordable care.",
      cta: "Get Started",
      ctaLink: "#search"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const filteredHospitals = ethiopianHospitals.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Slideshow Hero - Centered */}
      <div className="hero-wrapper">
        <div className="hero-slideshow">
          {slides.map((slide, index) => (
            <div key={index} className={`slide slide-${index + 1} ${currentSlide === index ? 'active' : ''}`}>
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <a href={slide.ctaLink} className="btn-hero">{slide.cta}</a>
              </div>
            </div>
          ))}
          <button className="slide-arrow prev" onClick={prevSlide}>‹</button>
          <button className="slide-arrow next" onClick={nextSlide}>›</button>
          <div className="slide-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`slide-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <span className="stat-icon">🏥</span>
          <span className="stat-number">50K+</span>
          <span className="stat-label">Patients Helped</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <span className="stat-number">4.6</span>
          <span className="stat-label">Average Rating</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📍</span>
          <span className="stat-number">100+</span>
          <span className="stat-label">Partner Hospitals</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👨‍⚕️</span>
          <span className="stat-number">98%</span>
          <span className="stat-label">Satisfaction Rate</span>
        </div>
      </section>

      {/* Why Choose Us */}
      <h2 className="section-title">Why Choose CareConnect?</h2>
      <p className="section-subtitle">We make finding quality healthcare simple, transparent, and accessible.</p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
          <h3>Verified Hospitals</h3>
          <p>All hospitals are verified and meet Ethiopian healthcare quality standards.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-clock"></i></div>
          <h3>Reduced Wait Times</h3>
          <p>Book appointments online and skip the long queues.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-star"></i></div>
          <h3>Patient Reviews</h3>
          <p>Real reviews from real patients to help you make informed decisions.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-phone-alt"></i></div>
          <h3>24/7 Support</h3>
          <p>Our team is always ready to help you find the care you need.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-heart"></i></div>
          <h3>Compassionate Care</h3>
          <p>We prioritize your health and wellbeing above everything else.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-money-bill-wave"></i></div>
          <h3>Transparent Pricing</h3>
          <p>Clear pricing information so you know what to expect before your visit.</p>
        </div>
      </div>

      {/* How It Works - 3 Steps */}
      <div className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Find the right hospital in 3 simple steps</p>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Search</h4>
            <p>Enter your symptoms, budget, and location</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Compare</h4>
            <p>View matching hospitals with ratings and reviews</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Book</h4>
            <p>Book your appointment instantly online</p>
          </div>
        </div>
      </div>

      {/* Ethiopian Hospitals */}
      <div className="hospitals-section" id="hospitals">
        <h2 className="section-title">Featured Ethiopian Hospitals</h2>
        <p className="section-subtitle">Top-rated healthcare facilities across Ethiopia</p>

        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Search hospitals by name, specialty, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px',
              border: '2px solid #E2E8F0',
              borderRadius: '12px',
              fontSize: '16px',
              background: 'white',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#2563EB'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          />
        </div>

        <div className="hospitals-grid">
          {filteredHospitals.map(hospital => (
            <div key={hospital.id} className="hospital-card">
              <div className="hospital-card-image">
                <i className="fas fa-hospital-medical"></i>
                <span className="hospital-card-badge">{hospital.type}</span>
              </div>
              <div className="hospital-card-content">
                <h3>{hospital.name}</h3>
                <p className="location"><i className="fas fa-map-marker-alt"></i> {hospital.location}</p>
                <span className="specialty">{hospital.specialty}</span>
                <p className="services">{hospital.services}</p>
                <div className="hospital-card-footer">
                  <span className="rating">⭐ {hospital.rating}</span>
                  <span className="type">{hospital.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="show-more-wrapper">
          <Link to="/hospitals" className="btn-show-more">
            Show More Hospitals →
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-subtitle">Real stories from real people who found care through CareConnect</p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <blockquote>"CareConnect helped me find the right hospital for my mother's heart surgery. The process was so easy!"</blockquote>
            <div className="author">
              <div className="author-avatar">AK</div>
              <div className="author-info">
                <h4>Abebe K.</h4>
                <span>Addis Ababa</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <blockquote>"I found a great pediatrician for my daughter within minutes. Thank you CareConnect!"</blockquote>
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
            <blockquote>"The transparent pricing helped me choose a hospital within my budget. Highly recommended!"</blockquote>
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

      {/* CTA Section */}
      <div className="cta-section" id="search">
        <h2>Ready to Find Your Hospital?</h2>
        <p>Search our database of Ethiopian hospitals and book your appointment today.</p>
        <a href="#search" className="btn-cta">Start Searching</a>
      </div>
    </div>
  );
}

export default Home;