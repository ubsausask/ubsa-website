import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// --- PUBLIC PAGES ---
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';
import About from './pages/About';
import Join from './pages/Join';

// --- ADMIN PAGES ---
import Login from './pages/adminpages/Login';
import Dashboard from './pages/adminpages/Dashboard';
import AddEvent from './pages/adminpages/AddEvent';
import ManageGallery from './pages/adminpages/ManageGallery';

function App() {
  const location = useLocation();

  // Logic: True if URL starts with "/admin", False otherwise
  // This hides the main site Navbar and Footer from the Admin portal
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* 1. Show Global Navbar only on public pages */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join" element={<Join />} />

        {/* --- ADMIN ROUTES --- */}
        {/* Fix: Explicitly define the login path */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Redirect /admin to /admin/login for convenience */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Wrap Protected Routes in the Auth Guard */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-event" element={<AddEvent />} />
          <Route path="/admin/manage-gallery" element={<ManageGallery />} />
        </Route>

        {/* --- 404 CATCH-ALL --- */}
        {/* Prevents blank screens for mistyped URLs */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '150px 20px', color: 'white' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/" style={{ color: '#e36f04' }}>Return Home</a>
          </div>
        } />
      </Routes>

      {/* 2. Show Global Footer only on public pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;