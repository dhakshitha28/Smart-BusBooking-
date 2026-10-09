import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute guards routes against unauthorized access.
 *
 * Checks:
 * 1. Is the visitor authenticated? (has valid token)
 * 2. Does the visitor possess the required role? (allowedRoles match)
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !allowedRoles.includes(user.role)) {
      // Redirect to the user's appropriate home dashboard
      if (user?.role === 'ROLE_ADMIN') {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (user?.role === 'ROLE_DRIVER') {
        return <Navigate to="/driver/dashboard" replace />;
      } else {
        return <Navigate to="/user/dashboard" replace />;
      }
    }
  }

  return children;
}
