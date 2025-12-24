import React, { useState, useEffect } from 'react';
import { FaSearch, FaEnvelope, FaTrash, FaUsers, FaChartPie } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import '../../style/adminpages/Memberpage.css';

const COLORS = ['#ff8c00', '#ff4d4d', '#2ecc71', '#3498db', '#9c27b0', '#f39c12'];

export default function MembersPage() {
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
      setMembers(Array.isArray(data) ? data : []);
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

  const getDeptData = () => {
    const counts = {};
    members.forEach(m => {
      const dept = m.department || "Unspecified";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.keys(counts).map(dept => ({ name: dept, value: counts[dept] }));
  };

  const filteredMembers = members.filter(m => 
    `${m.first_name} ${m.last_name} ${m.student_id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (email) => {
    setSelectedEmails(prev => 
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const handleBroadcast = () => {
    if (selectedEmails.length === 0) return alert("Please select at least one member.");
    if (window.confirm(`Send a broadcast email to ${selectedEmails.length} selected members?`)) {
      alert(`Broadcast sent to: ${selectedEmails.join(', ')}`);
      setSelectedEmails([]);
    }
  };

  if (loading) return <div className="admin-loading">Loading Directory...</div>;

  return (
    <div className="members-integrated-view">
      {/* HEADER SECTION */}
      <div className="members-page-header">
        <div className="header-text">
          <h2><FaUsers /> Member Directory</h2>
          <p>Total Registered: {members.length}</p>
        </div>
        <button className="broadcast-action-btn" onClick={handleBroadcast}>
          <FaEnvelope /> Broadcast ({selectedEmails.length})
        </button>
      </div>

      {/* TOP SECTION: CHART & SEARCH */}
      <div className="members-top-grid">
        <div className="chart-card glass-effect">
          <h3 className="chart-title"><FaChartPie /> Department Distribution</h3>
          <div className="integrated-pie-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={getDeptData()} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                >
                  {getDeptData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="search-filter-card glass-effect">
           <h3><FaSearch /> Quick Search</h3>
           <div className="search-wrapper">
              <input 
                type="text" 
                placeholder="Name, ID, or NSID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <p className="search-hint">Tip: Select checkboxes to broadcast emails to specific groups.</p>
        </div>
      </div>

      {/* TABLE SECTION: Internal Scroll */}
      <div className="members-table-viewport glass-effect">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Full Name</th>
              <th>Student ID</th>
              <th>Department</th>
              <th style={{textAlign: 'center'}}>Action</th>
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
                <td className="member-name-cell">{m.first_name} {m.last_name}</td>
                <td><code className="id-code">{m.student_id}</code></td>
                <td><span className="dept-badge">{m.department}</span></td>
                <td style={{textAlign: 'center'}}>
                  <button className="delete-row-btn" onClick={() => handleDelete(m.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}