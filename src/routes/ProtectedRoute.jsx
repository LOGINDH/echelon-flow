import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_HOMES = {
  admin: '/admin',
  tl: '/tl',
  employee: '/employee',
};

/**
 * Route protection wrapper component.
 * Validates authentication status and role access permissions.
 * 
 * @param {Object} props
 * @param {string|string[]} [props.allowedRoles] - Optional role or list of roles permitted to access the route
 * @param {React.ReactNode} [props.children] - Child elements to render if authorized
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const permittedRoles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!permittedRoles.includes(user.role)) {
      // Redirect to their respective home if authorized for another role
      const redirectPath = ROLE_HOMES[user.role] || '/login';
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children ? children : <Outlet />;
}
