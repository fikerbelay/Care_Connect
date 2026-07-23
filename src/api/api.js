const API_BASE = 'http://localhost:5000/api';

// ============ AUTH ============
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  } catch (error) {
    console.error('Register error:', error);
    return { status: 'error', message: 'Network error' };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    return { status: 'error', message: 'Network error' };
  }
}

export async function logoutUser(token) {
  try {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Network error' };
  }
}

export async function getCurrentUser(token) {
  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Network error' };
  }
}

// ============ PROFILE ============
export async function getProfile(token) {
  try {
    const response = await fetch(`${API_BASE}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Network error' };
  }
}

export async function updateProfile(token, data) {
  try {
    const response = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Network error' };
  }
}

export async function changePassword(token, data) {
  try {
    const response = await fetch(`${API_BASE}/profile/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    return { status: 'error', message: 'Network error' };
  }
}