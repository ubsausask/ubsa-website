import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout & Protection
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/adminpages/Login';
import Dashboard from './pages/adminpages/Dashboard';

// Admin Sub-Pages
import MembersPage from './pages/adminpages/MembersPage';
import Inbox from './pages/adminpages/Inbox';
import ManageSponsors from './pages/adminpages/ManageSponsors';
import AddEvent from './pages/adminpages/AddEvent';
import ManageGallery from './pages/adminpages/ManageGallery';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Admin Auth */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Protected Admin Shell */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />}>
            {/* These "Children" will appear inside the Dashboard's right panel */}
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<div>Your Stats/Charts Component</div>} />
            <Route path="members" element={<MembersPage />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="sponsors" element={<ManageSponsors />} />
            <Route path="add-event" element={<AddEvent />} />
            <Route path="gallery" element={<ManageGallery />} />
          </Route>
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;