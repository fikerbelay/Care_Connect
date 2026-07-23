import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function HospitalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700' }}>🏥 Hospital Details</h1>
      <p>Hospital ID: {id}</p>
      <button
        onClick={() => navigate('/hospitals')}
        style={{
          marginTop: '20px',
          padding: '12px 32px',
          background: '#1A1A1A',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer'
        }}
      >
        Back to Hospitals
      </button>
    </div>
  );
}

export default HospitalDetail;