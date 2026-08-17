import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../api/auth';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin', { replace: true });
      else if (user.role === 'tl') navigate('/tl', { replace: true });
      else if (user.role === 'employee') navigate('/employee', { replace: true });
      else navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (!role) newErrors.role = 'Role is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setApiError('');
    setLoading(true);
    
    try {
      const response = await apiLogin(username, password, role);
      if (response.success) {
        login(response.user);
        if (response.user.role === 'admin') navigate('/admin');
        else if (response.user.role === 'tl') navigate('/tl');
        else if (response.user.role === 'employee') navigate('/employee');
      } else {
        setApiError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setApiError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#1a0a00]">
      {/* Background Glow Shapes */}
      <div 
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none"
        style={{ backgroundColor: '#d97706' }}
      ></div>
      <div 
        className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] md:w-[700px] md:h-[700px] rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #e65c00, #ff8c00)' }}
      ></div>

      {/* Glass Card */}
      <div 
        className="relative z-10 w-full max-w-[calc(100vw-32px)] md:max-w-[480px] p-8 md:p-12 animate-fade-in-up"
        style={{
          background: 'rgba(255, 120, 30, 0.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '28px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Card Header Typo */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">Echelon</h2>
            <p className="text-[rgba(255,255,255,0.7)] text-sm">Flow</p>
          </div>
          <div className="text-white text-sm font-medium">
            Welcome back
          </div>
        </div>

        {/* Large Heading */}
        <h1 className="text-white font-[800] text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.02em] mb-8">
          Hello,<br />
          Sign in to<br />
          Echelon Flow.
        </h1>

        {/* Error Banner */}
        {apiError && (
          <div 
            className="mb-6 p-3 rounded-[14px] text-white text-sm"
            style={{
              background: 'rgba(255, 50, 50, 0.12)',
              border: '1px solid rgba(255, 50, 50, 0.25)',
            }}
          >
            {apiError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-white text-[13px] font-medium mb-1.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full text-[15px] text-white placeholder-[rgba(255,255,255,0.35)] p-[14px_16px] rounded-[14px] outline-none transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(255, 140, 0, 0.5)';
                e.target.style.boxShadow = '0 0 0 2px rgba(255, 140, 0, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.username && <p className="text-[#ff6b6b] text-xs mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-[13px] font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full text-[15px] text-white placeholder-[rgba(255,255,255,0.35)] p-[14px_16px] pr-12 rounded-[14px] outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 0, 0.5)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(255, 140, 0, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.5)] hover:text-white transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-[#ff6b6b] text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-white text-[13px] font-medium mb-1.5">
              Role
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full appearance-none text-[15px] text-white p-[14px_16px] pr-10 rounded-[14px] outline-none transition-all duration-200 cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 0, 0.5)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(255, 140, 0, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="" disabled className="text-gray-900">Select your role</option>
                <option value="admin" className="text-gray-900">Admin</option>
                <option value="tl" className="text-gray-900">Team Lead</option>
                <option value="employee" className="text-gray-900">Employee</option>
              </select>
              {/* Custom Select Arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(255,255,255,0.5)]">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            {errors.role && <p className="text-[#ff6b6b] text-xs mt-1">{errors.role}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 text-white font-bold text-[16px] py-[16px] rounded-[14px] transition-all duration-200 flex items-center justify-center ${
              loading ? 'opacity-60 cursor-not-allowed' : 'hover:brightness-110 hover:scale-[1.02]'
            }`}
            style={{
              background: 'linear-gradient(135deg, #e65c00, #ff8c00)'
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-[rgba(255,255,255,0.45)] text-[13px]">
          Role-based workspace access
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
