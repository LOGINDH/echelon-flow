import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_MOCK_USER = {
  id: 'tl-1',
  name: 'Alex Morgan',
  email: 'tl@echelon.com',
  role: 'tl',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  title: 'Lead Development Manager'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('echelon_user');
      return savedUser ? JSON.parse(savedUser) : DEFAULT_MOCK_USER;
    } catch {
      return DEFAULT_MOCK_USER;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('echelon_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('echelon_user');
  };

  return (
    <AuthContext.Provider value={{ user: user || DEFAULT_MOCK_USER, login, logout, isAuthenticated: true }}>
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
