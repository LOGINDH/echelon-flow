import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'echelon_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 3,
    username: 'ravi',
    full_name: 'Ravi Kumar',
    role: 'employee'
  });

  /**
   * Log in user and persist session in state + localStorage.
   * @param {Object} userData - Object containing user identity (id, name, email, role, etc.)
   */
  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (err) {
      console.error('Failed to save user session to localStorage:', err);
    }
  };

  /**
   * Log out current user and clear local session state.
   */
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to remove user session from localStorage:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
