import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaArrowLeft, FaHistory, FaSave } from 'react-icons/fa';
import '../../style/adminpages/Dashboard.css';
import '../../style/adminpages/SetupCommittee.css';
import { api } from '../../api';

export default function SetupCommittee() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Default roles for the UBSA executive board
    const [execs, setExecs] = useState([
        { role: 'President', name: '' },
        { role: 'Vice President', name: '' },
        { role: 'General Secretary', name: '' },
        { role: 'Treasurer', name: '' },
        { role: 'Communications Lead', name: '' }
    ]);

    const handleInputChange = (index, value) => {
        const updated = [...execs];
        updated[index].name = value;
        setExecs(updated);
    };

    const handleResetSubmit = async () => {
        if (!window.confirm("This action will archive the current committee and update the About page. Proceed?")) return;

        setLoading(true);
        try {
            const response = await fetch(api('/executives/reset'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ execs })
            });

            if (response.ok) {
                alert("Committee Transition Successful!");
                navigate('/admin/dashboard');
            }
        } catch (err) {
            alert("Connection error. Transition failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="header-text">
                    <h1>Committee <span className="text-highlight">Transition</span></h1>
                    <p>Archive current data and set up the new Executive Team</p>
                </div>
                <button className="logout-pill" style={{background: 'rgba(255,255,255,0.1)', color: 'white'}} onClick={() => navigate('/admin/dashboard')}>
                    <FaArrowLeft /> Back
                </button>
            </div>

            <div className="glass setup-container">
                <div className="setup-warning">
                    <FaHistory />
                    <div>
                        <strong>Executive Handover Mode</strong>
                        <p>Entering new names will automatically move current executives to the "Past Committee" archive.</p>
                    </div>
                </div>

                <div className="setup-list">
                    {execs.map((exec, index) => (
                        <div key={index} className="setup-row">
                            <div className="role-badge">{exec.role}</div>
                            <div className="input-field">
                                <input 
                                    type="text" 
                                    placeholder={`Enter Name`}
                                    value={exec.name}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                            </div>
                            <button className="photo-btn">
                                <FaCloudUploadAlt /> <span>Photo</span>
                            </button>
                        </div>
                    ))}
                </div>

                <button 
                    className="confirm-transition-btn" 
                    onClick={handleResetSubmit}
                    disabled={loading || execs.some(e => !e.name)}
                >
                    {loading ? "Updating..." : "Confirm & Update Website"}
                </button>
            </div>
        </div>
    );
}