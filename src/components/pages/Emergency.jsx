import React from 'react';

function Emergency() {
  return (
    <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '700' }}>🚑 Emergency Contacts</h1>
      <div style={{ maxWidth: '400px', margin: '24px auto', textAlign: 'left' }}>
        <p><strong>Police:</strong> 911</p>
        <p><strong>Ambulance:</strong> 907</p>
        <p><strong>Fire:</strong> 939</p>
        <p><strong>Emergency Hotline:</strong> +251 11 123 4567</p>
      </div>
    </div>
  );
}

export default Emergency;