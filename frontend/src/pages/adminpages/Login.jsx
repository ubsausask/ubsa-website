import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaShieldAlt } from 'react-icons/fa';
import '../../style/adminpages/Dashboard.css'; 

export default function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('adminToken') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'tiger2025') {
      localStorage.setItem('adminToken', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Incorrect Password');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="glass login-card">
        <div className="login-header">
          <FaShieldAlt className="login-icon" />
          <h2>Admin <span className="text-highlight">Access</span></h2>
          <p>UBSA Website Management</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type="password" 
              placeholder="Enter Access Key" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-submit-btn">
            Authorize Entry
          </button>
        </form>
      </div>
    </div>
  );
}