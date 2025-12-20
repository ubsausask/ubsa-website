import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Point to the 'adminpages' folder inside 'style'
import '../../style/adminpages/Dashboard.css'; 

export default function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // HARDCODED PASSWORD (change 'tiger2025' to whatever you want)
    if (password === 'tiger2025') {
      localStorage.setItem('adminToken', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Incorrect Password');
    }
  };

  return (
    <div className="dashboard-container" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div className="glass" style={{padding: '3rem', width:'100%', maxWidth:'400px', textAlign:'center'}}>
        <h2 style={{marginBottom:'1.5rem', color:'#e36f04'}}>Admin Access</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
                width: '100%', padding: '10px', borderRadius:'5px', 
                border:'1px solid #444', background:'rgba(0,0,0,0.5)', 
                color:'white', marginBottom:'1rem'
            }}
          />
          <button 
            type="submit" 
            style={{
                width:'100%', padding:'10px', background:'#e36f04', 
                color:'white', border:'none', borderRadius:'5px', 
                fontWeight:'bold', cursor:'pointer'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}