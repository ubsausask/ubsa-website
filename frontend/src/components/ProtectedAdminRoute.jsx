import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
  // Simple check: Is there an 'adminToken' in local storage?
  // In a real app, you'd verify this token with the backend.
  const isAdmin = localStorage.getItem('adminToken') === 'true';

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedAdminRoute;