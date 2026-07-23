import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    bio: ''
  });

  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setUser(data.data);
        setFormData({
          fullName: data.data.fullName || '',
          phone: data.data.phone || '',
          location: data.data.location || '',
          bio: data.data.bio || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setUser(data.data);
        const updatedUser = { ...userData, ...data.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setMessage('Profile updated successfully!');
        setEditing(false);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Update failed');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading && !user) {
    return <div style={{ padding: '80px 0', textAlign: 'center' }}>Loading profile...</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>My Profile</h1>
      <p style={{ color: '#4A4A4A', marginBottom: '32px' }}>Manage your account details</p>

      {message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: '#E8F5E9',
          color: '#2E7D32'
        }}>
          {message}
        </div>
      )}

      {/* Profile Card */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        border: '1px solid #E8E8E8',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#1A1A1A',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700' }}>{user?.fullName}</h2>
            <p style={{ color: '#4A4A4A' }}>{user?.email}</p>
            <span style={{
              display: 'inline-block',
              padding: '2px 14px',
              borderRadius: '20px',
              background: '#F5F5F5',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'capitalize',
              marginTop: '4px'
            }}>
              {user?.role || 'Patient'}
            </span>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            style={{
              padding: '8px 24px',
              background: editing ? '#EF4444' : '#1A1A1A',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          padding: '16px 0',
          borderTop: '1px solid #F5F5F5',
          borderBottom: '1px solid #F5F5F5',
          marginBottom: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>0</div>
            <div style={{ fontSize: '12px', color: '#4A4A4A' }}>Appointments</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>0</div>
            <div style={{ fontSize: '12px', color: '#4A4A4A' }}>Reviews</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700' }}>{formatDate(user?.createdAt)}</div>
            <div style={{ fontSize: '12px', color: '#4A4A4A' }}>Member Since</div>
          </div>
        </div>

        {!editing ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#8A8A8A' }}>Phone</p>
              <p style={{ fontWeight: '500' }}>{user?.phone || 'Not set'}</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#8A8A8A' }}>Location</p>
              <p style={{ fontWeight: '500' }}>{user?.location || 'Not set'}</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={{ fontSize: '12px', color: '#8A8A8A' }}>Bio</p>
              <p style={{ fontWeight: '500' }}>{user?.bio || 'No bio yet. Tell us about yourself!'}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label style={{ fontWeight: '600', fontSize: '14px' }}>Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E8E8E8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1A1A1A'}
                onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '600', fontSize: '14px' }}>Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+251 912 345 678"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E8E8E8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1A1A1A'}
                onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '600', fontSize: '14px' }}>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Addis Ababa"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E8E8E8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1A1A1A'}
                onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '600', fontSize: '14px' }}>Bio</label>
              <textarea
                rows="3"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about yourself..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E8E8E8',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1A1A1A'}
                onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: '#1A1A1A',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = '#4A4A4A'}
              onMouseLeave={(e) => e.target.style.background = '#1A1A1A'}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          padding: '14px',
          background: '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = '#DC2626'}
        onMouseLeave={(e) => e.target.style.background = '#EF4444'}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;