import React from 'react';

function Appointments() {
  return (
    <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700' }}>📅 My Appointments</h1>
      <p style={{ color: '#4A4A4A' }}>You have no upcoming appointments.</p>
      <p style={{ color: '#8A8A8A', fontSize: '14px' }}>Book your first appointment from the home page.</p>
    </div>
  );
}

export default Appointments;