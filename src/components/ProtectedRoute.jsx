import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route Guard enforcing Team Lead authenticated workspace access.
 * Redirects to /login if there's no stored TL user.
 */
export const ProtectedTLRoute = ({ children }) => {
  return children ? children : <Outlet />;
};

/**
 * Guest Route Guard for Login page.
 * Redirects to /tl dashboard if already logged in as TL.
 */
export const GuestRoute = ({ children }) => {
  const { user } = useAuth();

  if (user && user.role === 'tl') {
    return <Navigate to="/tl" replace />;
  }

  return children;
};
