import React from 'react';

function Contact() {
  return (
    <div>
      {/* ===== HEADER ===== */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A1A, #4A4A4A)',
        color: 'white',
        padding: '50px 0',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '8px' }}>About This Project</h1>
          <p style={{ fontSize: '17px', opacity: '0.9' }}>
            CareConnect is a personal project built to showcase healthcare technology in Ethiopia.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '0 28px 60px', maxWidth: '800px', margin: '0 auto' }}>
        {/* ===== PROJECT INFO ===== */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #E8E8E8',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
            📋 About CareConnect
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
            CareConnect is a <strong>personal university project</strong> built to demonstrate
            how technology can improve healthcare access in Ethiopia. The platform connects
            patients with hospitals across the country, making it easier to find the right
            care for your needs.
          </p>
          <p style={{ color: '#4A4A4A', fontSize: '16px', lineHeight: '1.8' }}>
            This is a <strong>portfolio project</strong> and not a real healthcare platform.
            All hospital data is based on real Ethiopian hospitals but is for demonstration
            purposes only.
          </p>
        </div>

        {/* ===== DEVELOPER INFO ===== */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #E8E8E8',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
             Developer
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            <div style={{
              padding: '16px',
              background: '#F5F5F5',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '12px', color: '#8A8A8A' }}>Name</div>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>Fiker Belay Tsegaye</div>
            </div>
            <div style={{
              padding: '16px',
              background: '#F5F5F5',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '12px', color: '#8A8A8A' }}>Email</div>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>
                <a href="mailto:fiker23sw@gmail.com" style={{ color: '#1A1A1A', textDecoration: 'none' }}>
                  fiker23sw@gmail.com
                </a>
              </div>
            </div>
            <div style={{
              padding: '16px',
              background: '#F5F5F5',
              borderRadius: '12px',
              gridColumn: '1 / -1'
            }}>
              <div style={{ fontSize: '12px', color: '#8A8A8A' }}>GitHub</div>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>
                <a href="https://github.com/fikerbelay" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1A1A', textDecoration: 'none' }}>
                  github.com/fikerbelay
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TECH STACK ===== */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #E8E8E8',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
            🛠️ Tech Stack
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{
              padding: '8px 20px',
              background: '#1A1A1A',
              color: 'white',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              React
            </span>
            <span style={{
              padding: '8px 20px',
              background: '#1A1A1A',
              color: 'white',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Node.js
            </span>
            <span style={{
              padding: '8px 20px',
              background: '#1A1A1A',
              color: 'white',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Express
            </span>
            <span style={{
              padding: '8px 20px',
              background: '#1A1A1A',
              color: 'white',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              MongoDB
            </span>
            <span style={{
              padding: '8px 20px',
              background: '#1A1A1A',
              color: 'white',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              JWT Authentication
            </span>
            <span style={{
              padding: '8px 20px',
              background: '#1A1A1A',
              color: 'white',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              REST API
            </span>
          </div>
        </div>

        {/* ===== PURPOSE ===== */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #E8E8E8'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
            🎯 Purpose
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '16px', lineHeight: '1.8' }}>
            This project was built as part of a university coursework to demonstrate
            full-stack development skills. It showcases:
          </p>
          <ul style={{
            color: '#4A4A4A',
            fontSize: '16px',
            lineHeight: '2',
            paddingLeft: '20px',
            marginTop: '8px'
          }}>
            <li>React frontend with responsive design</li>
            <li>Node.js + Express backend API</li>
            <li>MongoDB Atlas database integration</li>
            <li>JWT-based authentication</li>
            <li>Real Ethiopian hospital data</li>
          </ul>
          <p style={{ color: '#8A8A8A', fontSize: '14px', marginTop: '16px', fontStyle: 'italic' }}>
            📌 This is a personal portfolio project. Not for real medical use.
          </p>
        </div>

        {/* ===== FOOTER NOTE ===== */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          color: '#8A8A8A',
          fontSize: '14px'
        }}>
          <p style={{ marginTop: '4px' }}>
            <a href="https://github.com/fikerbelay" target="_blank" rel="noopener noreferrer" style={{ color: '#4A4A4A' }}>
              View on GitHub →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;