import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>
            <i className="fas fa-hospital"></i> CareConnect
            <span className="nhs-style">NHS-Approved</span>
          </h1>
          <p>Find the right hospital for your needs</p>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/hospitals">Hospitals</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" id="loginBtn">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;