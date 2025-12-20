import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaCalendarPlus, FaImages, FaUsers, FaHandshake, 
  FaTicketAlt, FaCog, FaSignOutAlt, FaChartLine,
  FaMoneyBillWave, FaTrash, FaCheckCircle, FaHistory 
} from 'react-icons/fa';
import { MdDashboardCustomize, MdOutlineLibraryAdd } from 'react-icons/md';
import '../../style/adminpages/Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');
  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState({
    events: [],
    photos: [],
    members: [],
    sponsors: []
  });

  useEffect(() => {
    // Auth Guard
    if (localStorage.getItem('adminToken') !== 'true') {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const urls = [
        'http://localhost:5000/api/events',
        'http://localhost:5000/api/gallery',
        'http://localhost:5000/api/members',
        'http://localhost:5000/api/sponsor-applications'
      ];

      const [events, photos, members, sponsors] = await Promise.all(
        urls.map(url => fetch(url).then(res => res.json()))
      );

      setData({ events, photos, members, sponsors });
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- MEMBER ACTIONS ---
  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Paid' ? 'Pending' : 'Paid';
    if (!window.confirm(`Mark member as ${newStatus}?`)) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchAllData();
    } catch (err) { alert("Failed to update status"); }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Permanently delete this ${type}? This action cannot be undone.`)) return;
    try {
      const endpoint = type === 'members' ? `members/${id}` : `sponsor-applications/${id}`;
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, { method: 'DELETE' });
      if (res.ok) fetchAllData();
    } catch (err) { alert("Delete failed"); }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Financial calculation: $5 per Paid member
  const totalFunds = data.members.filter(m => m.status === 'Paid').length * 5;

  if (loading) return <div className="admin-loading">Initializing UBSA Systems...</div>;

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-text">
          <h1><MdDashboardCustomize className="header-icon-main" /> Admin <span className="text-highlight">Control</span></h1>
          <p>UBSA Website Management System | Session: 2025-2026</p>
        </div>
        <button className="logout-pill" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* STATS STRIP */}
      <div className="stats-grid">
        <div className="stat-card glass orange-glow" onClick={() => setActiveTab('members')}>
          <div className="stat-icon-wrapper"><FaUsers /></div>
          <div className="stat-info">
            <h3>Total Members</h3>
            <p className="stat-number">{data.members.length}</p>
          </div>
        </div>
        <div className="stat-card glass green-glow">
          <div className="stat-icon-wrapper"><FaMoneyBillWave /></div>
          <div className="stat-info">
            <h3>Treasury</h3>
            <p className="stat-number">${totalFunds}</p>
          </div>
        </div>
        <div className="stat-card glass gold-glow" onClick={() => setActiveTab('sponsors')}>
          <div className="stat-icon-wrapper"><FaHandshake /></div>
          <div className="stat-info">
            <h3>Sponsors</h3>
            <p className="stat-number">{data.sponsors.length}</p>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="section-title"><FaChartLine /> Management Tools</h2>
      <div className="actions-grid">
        <Link to="/admin/add-event" className="action-card glass-hover">
          <MdOutlineLibraryAdd className="action-icon-premium" />
          <h3>New Event</h3>
        </Link>
        <Link to="/admin/manage-gallery" className="action-card glass-hover">
          <FaImages className="action-icon-premium" />
          <h3>Photo Hub</h3>
        </Link>
        <Link to="/admin/setup-committee" className="action-card glass-hover danger-btn">
          <FaHistory className="action-icon-premium" />
          <h3>Reset Committee</h3>
        </Link>
        <div className="action-card glass-hover disabled">
          <FaCog className="action-icon-premium" />
          <h3>Settings</h3>
        </div>
      </div>

      {/* TABS & TABLES */}
      <div className="management-tabs">
        <button className={activeTab === 'members' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('members')}>Members List</button>
        <button className={activeTab === 'sponsors' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('sponsors')}>Sponsor Apps</button>
      </div>

      <div className="glass table-wrapper">
        {activeTab === 'members' ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.members.map(m => (
                <tr key={m.id}>
                  <td>{m.first_name} {m.last_name}</td>
                  <td>{m.student_id}</td>
                  <td><span className={`status-badge ${m.status.toLowerCase()}`}>{m.status}</span></td>
                  <td className="action-btns">
                    <button onClick={() => handleUpdateStatus(m.id, m.status)} className="verify-btn" title="Toggle Paid Status"><FaCheckCircle /></button>
                    <button onClick={() => handleDelete('members', m.id)} className="delete-btn" title="Remove Member"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>Tier</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.sponsors.map(s => (
                <tr key={s.id}>
                  <td>{s.business_name}</td>
                  <td>{s.tier}</td>
                  <td>{s.payment_type}</td>
                  <td>
                    <button onClick={() => handleDelete('sponsors', s.id)} className="delete-btn"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}