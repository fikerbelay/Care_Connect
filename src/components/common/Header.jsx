import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>
            <i className="fas fa-heartbeat"></i> CareConnect
          </h1>
        </div>
        <nav>
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/hospitals" className={isActive('/hospitals')}>Find Hospital</Link>
          <Link to="/services" className={isActive('/services')}>Services</Link>
          <Link to="/about" className={isActive('/about')}>About</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact</Link>
          {isLoggedIn ? (
            <Link to="/profile" className={`login-btn ${isActive('/profile')}`}>
              <i className="fas fa-user"></i> {user?.fullName?.split(' ')[0] || 'Profile'}
            </Link>
          ) : (
            <Link to="/login" className={`login-btn ${isActive('/login')}`}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;