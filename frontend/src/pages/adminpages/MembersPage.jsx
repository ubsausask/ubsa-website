import React, { useState, useEffect } from 'react';
import { FaSearch, FaEnvelope, FaTrash, FaUsers, FaChartPie, FaArrowLeft } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import '../../style/adminpages/Memberpage.css';

const COLORS = ['#e36f04', '#004f26', '#2196f3', '#ffd700', '#9c27b0', '#ff5252'];

export default function MembersPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/members');
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this member?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/members/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMembers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // --- DATA PROCESSING FOR CHART ---
  const getDeptData = () => {
    const counts = {};
    members.forEach(m => {
      const dept = m.department || "Unspecified";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.keys(counts).map(dept => ({ name: dept, value: counts[dept] }));
  };

  // --- SEARCH & FILTER ---
  const filteredMembers = members.filter(m => 
    `${m.first_name} ${m.last_name} ${m.student_id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (email) => {
    setSelectedEmails(prev => 
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const handleBroadcast = () => {
    const count = selectedEmails.length;
    if (count === 0) return alert("Please select at least one member.");
    
    if (window.confirm(`Send a broadcast email to ${count} selected members?`)) {
      alert(`Broadcast sent to: ${selectedEmails.join(', ')}`);
      setSelectedEmails([]); // Clear selection after "sending"
    }
  };

  if (loading) return <div className="admin-loading">Loading Directory...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-text">
          <h1><FaUsers className="header-icon-main" /> Member <span className="text-highlight">Directory</span></h1>
          <p>Manage and communicate with all registered UBSA members.</p>
        </div>
        <div style={{display: 'flex', gap: '15px'}}>
            <button className="logout-pill" style={{background: 'rgba(255,255,255,0.1)', color: 'white'}} onClick={() => navigate('/admin/dashboard')}>
                <FaArrowLeft /> Dashboard
            </button>
            <button className="broadcast-action-btn" onClick={handleBroadcast}>
                <FaEnvelope /> Broadcast ({selectedEmails.length})
            </button>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="glass chart-container" style={{marginBottom: '2rem'}}>
        <h3 className="chart-title"><FaChartPie /> Department Distribution</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie 
                data={getDeptData()} 
                innerRadius={70} 
                outerRadius={100} 
                paddingAngle={5} 
                dataKey="value"
              >
                {getDeptData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{background: '#111', border: '1px solid #e36f04', borderRadius: '10px'}} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="members-toolbar">
        <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input 
            type="text" 
            placeholder="Search by name, student ID, or NSID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* MEMBERS TABLE */}
      <div className="glass table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Student ID</th>
              <th>Department</th>
              <th style={{textAlign: 'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(m => (
              <tr key={m.id} className={selectedEmails.includes(m.email) ? 'selected-row' : ''}>
                <td>
                  <input 
                    type="checkbox" 
                    className="member-checkbox"
                    checked={selectedEmails.includes(m.email)}
                    onChange={() => toggleSelect(m.email)}
                  />
                </td>
                <td style={{fontWeight: '600'}}>{m.first_name} {m.last_name}</td>
                <td><code style={{color: '#e36f04'}}>{m.student_id}</code></td>
                <td><span className="dept-tag">{m.department}</span></td>
                <td className="action-btns" style={{justifyContent: 'center'}}>
                  <button className="delete-btn" onClick={() => handleDelete(m.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredMembers.length === 0 && (
            <p style={{textAlign: 'center', padding: '2rem', opacity: 0.5}}>No members found matching your search.</p>
        )}
      </div>
    </div>
  );
}