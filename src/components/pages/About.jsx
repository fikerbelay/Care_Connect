import React, { useState } from 'react';

function About() {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <div>
      {/* ===== HERO HEADER ===== */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #4A4A4A 50%, #1A1A1A 100%)',
        color: 'white',
        padding: '70px 0 50px',
        textAlign: 'center',
        marginBottom: '0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.02)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.015)',
          pointerEvents: 'none'
        }} />
        <div className="container">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏥</div>
          <h1 style={{ fontSize: '44px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-1px' }}>
            General Information
          </h1>
          <p style={{ fontSize: '19px', opacity: '0.85', maxWidth: '600px', margin: '0 auto' }}>
            CareConnect is a fullstack healthcare platform that helps Ethiopians find verified hospitals,
            book appointments, and manage their health all from one simple dashboard.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '0 28px 60px' }}>

        {/* ===== FUN STATS ROW ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '-30px',
          marginBottom: '40px',
          position: 'relative',
          zIndex: '2'
        }}>
          {[
            { number: '50+', label: 'Hospitals' },
            { number: '500+', label: 'Doctors' },
            { number: '12K+', label: 'Patients Helped' },
            { number: '24/7', label: 'Always Available' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px 16px',
              textAlign: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              border: '1px solid #E8E8E8',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = '#1A1A1A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
              e.currentTarget.style.borderColor = '#E8E8E8';
            }}
            >
              <div style={{ fontSize: '32px', marginBottom: '6px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#1A1A1A' }}>{stat.number}</div>
              <div style={{ fontSize: '14px', color: '#4A4A4A' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ===== TAB NAVIGATION ===== */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { id: 'mission', label: '🎯 Mission' },
            { id: 'story', label: '📖 Story' },
            { id: 'how', label: '⚙️ How It Works' },
            { id: 'team', label: ' The Developer' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                border: activeTab === tab.id ? '2px solid #1A1A1A' : '1px solid #E8E8E8',
                background: activeTab === tab.id ? '#1A1A1A' : 'white',
                color: activeTab === tab.id ? 'white' : '#4A4A4A',
                fontWeight: activeTab === tab.id ? '700' : '500',
                cursor: 'pointer',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = '#1A1A1A';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = '#E8E8E8';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== TAB CONTENT ===== */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #E8E8E8',
          minHeight: '300px',
          animation: 'fadeIn 0.4s ease'
        }}>

          {/* MISSION */}
          {activeTab === 'mission' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                🎯 Our Mission
              </h2>
              <p style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: '1.8', marginBottom: '16px' }}>
              Our mission is to make healthcare discovery simple, transparent, and accessible for every Ethiopian.
                We believe that finding the right hospital shouldn't be complicated so we built a platform that
                connects patients to trusted hospitals across the country, with clear pricing, real ratings, and easy
                appointment booking. Whether you're looking for general care or a specialist, CareConnect helps you make
                informed decisions about your health, quickly and without the guesswork.
                Because everyone deserves quality healthcare, when and where they need it.

              </p>
              <p style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: '1.8' }}>
                We believe that <strong>everyone deserves timely, appropriate, and affordable medical care</strong> and our intelligent matching system makes this possible.
              </p>
              <div style={{
                marginTop: '20px',
                padding: '16px 20px',
                background: '#F5F5F5',
                borderRadius: '12px',
                borderLeft: '4px solid #1A1A1A'
              }}>
                <p style={{ margin: 0, fontSize: '15px', color: '#1A1A1A', fontStyle: 'italic' }}>
                  "Healthcare should be simple, transparent, and accessible to everyone."
                </p>
              </div>
            </div>
          )}

          {/* STORY */}
          {activeTab === 'story' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                📖 Our Story
              </h2>
              <p style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: '1.8', marginBottom: '16px' }}>
                Founded in 2024 as a university project, CareConnect was born from a simple observation:
              </p>
              <p style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: '1.8', paddingLeft: '20px', borderLeft: '3px solid #1A1A1A', marginBottom: '16px' }}>
                <em>"Finding the right hospital for specific medical needs shouldn't be complicated."</em>
              </p>
              <p style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: '1.8' }}>
                Our team of healthcare professionals, technologists, and patient advocates came together to create a solution that puts patients first.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginTop: '20px'
              }}>
                <div style={{ textAlign: 'center', padding: '16px', background: '#F5F5F5', borderRadius: '12px' }}>
                  <div style={{ fontSize: '24px' }}>💡</div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>2024</div>
                  <div style={{ fontSize: '12px', color: '#4A4A4A' }}>Idea Born</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: '#F5F5F5', borderRadius: '12px' }}>
                  <div style={{ fontSize: '24px' }}>🏗️</div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>2025</div>
                  <div style={{ fontSize: '12px', color: '#4A4A4A' }}>Built & Launched</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: '#F5F5F5', borderRadius: '12px' }}>
                  <div style={{ fontSize: '24px' }}>🚀</div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>2026</div>
                  <div style={{ fontSize: '12px', color: '#4A4A4A' }}>Full Stack Complete</div>
                </div>
              </div>
            </div>
          )}

          {/* HOW IT WORKS */}
          {activeTab === 'how' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                ⚙️ How CareConnect Works
              </h2>
              <p style={{ color: '#4A4A4A', fontSize: '17px', lineHeight: '1.8', marginBottom: '24px' }}>
                In 4 simple steps, we connect you to the right hospital.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { step: '1', title: 'Search', desc: 'Enter your symptoms, budget, and location' },
                  { step: '2', title: 'Compare', desc: 'View matching hospitals with ratings and reviews' },
                  { step: '3', title: 'Book', desc: 'Book your appointment instantly online' },
                  { step: '4', title: 'Get Care', desc: 'Visit the hospital and receive quality care' }
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '20px',
                    background: '#F5F5F5',
                    borderRadius: '12px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1A1A1A';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.querySelectorAll('p').forEach(p => p.style.color = 'rgba(255,255,255,0.8)');
                    e.currentTarget.querySelectorAll('.step-num').forEach(el => el.style.color = 'white');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F5F5F5';
                    e.currentTarget.style.color = '#1A1A1A';
                    e.currentTarget.querySelectorAll('p').forEach(p => p.style.color = '#4A4A4A');
                    e.currentTarget.querySelectorAll('.step-num').forEach(el => el.style.color = '#1A1A1A');
                  }}
                  >
                    <div className="step-num" style={{ fontSize: '24px', fontWeight: '800', color: '#1A1A1A' }}>{item.step}</div>
                    <div style={{ fontWeight: '700', fontSize: '16px' }}>{item.title}</div>
                    <p style={{ fontSize: '13px', color: '#4A4A4A', margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THE DEVELOPER */}
          {activeTab === 'team' && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                The Developer
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1A1A1A, #4A4A4A)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  color: 'white',
                  fontWeight: '800',
                  flexShrink: '0'
                }}>
                  FB
                </div>
                <div style={{ flex: '1' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>Fiker Belay </h3>
                  <p style={{ color: '#4A4A4A', fontSize: '15px' }}>
                    Student | Developer
                  </p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                    <a href="mailto:fiker23sw@gmail.com" style={{ color: '#1A1A1A', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                      📧 fiker23sw@gmail.com
                    </a>
                    <a href="https://github.com/fikerbelay" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1A1A', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                      🐙 github.com/fikerbelay
                    </a>
                  </div>
                </div>
              </div>
              <div style={{
                marginTop: '20px',
                padding: '16px 20px',
                background: '#F5F5F5',
                borderRadius: '12px'
              }}>
                <p style={{ margin: 0, fontSize: '15px', color: '#4A4A4A' }}>
                  🇪🇹 Built with passion for improving healthcare access in Ethiopia.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ===== BOTTOM QUOTE ===== */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          padding: '30px',
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #E8E8E8'
        }}>
          <p style={{ fontSize: '18px', color: '#1A1A1A', fontWeight: '500', fontStyle: 'italic' }}>
            "Simple. Transparent. Reliable. Healthcare for all Ethiopians."
          </p>
          <p style={{ fontSize: '13px', color: '#8A8A8A', marginTop: '8px' }}>
            CareConnect 2026 A personal project by Fiker Belay
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;