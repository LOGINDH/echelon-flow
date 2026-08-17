import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSimulatedLogin = (role) => {
    const mockUser = {
      id: `user_${role}_1`,
      name: role === 'admin' ? 'Alex Vance (Admin)' : role === 'tl' ? 'Sarah Connor (TL)' : 'John Doe (Employee)',
      email: `${role}@echelonflow.io`,
      role: role,
      token: `mock_jwt_${role}_token_xyz`,
    };
    login(mockUser);
    if (role === 'admin') navigate('/admin');
    else if (role === 'tl') navigate('/tl');
    else if (role === 'employee') navigate('/employee');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl shadow-2xl border border-slate-800 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Login</h1>
        <p className="text-slate-400 text-sm mb-6">
          Echelon Flow Base Scaffold — Select a role to test protected route access.
        </p>

        {user ? (
          <div className="space-y-4">
            <div className="p-3 bg-indigo-950/50 border border-indigo-500/30 rounded-xl text-left text-xs text-indigo-300">
              <p className="font-semibold text-indigo-200">Currently Logged In:</p>
              <p>Name: {user.name}</p>
              <p>Role: <span className="uppercase font-bold text-amber-400">{user.role}</span></p>
            </div>
            <button
              onClick={() => {
                if (user.role === 'admin') navigate('/admin');
                else if (user.role === 'tl') navigate('/tl');
                else navigate('/employee');
              }}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition"
            >
              Go to {user.role.toUpperCase()} Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => handleSimulatedLogin('admin')}
              className="w-full py-3 px-4 bg-purple-600/80 hover:bg-purple-600 text-white font-semibold rounded-xl border border-purple-500/30 transition flex items-center justify-between"
            >
              <span>Simulate Admin Login</span>
              <span className="text-xs bg-purple-950/80 px-2 py-0.5 rounded border border-purple-400/30">admin</span>
            </button>

            <button
              onClick={() => handleSimulatedLogin('tl')}
              className="w-full py-3 px-4 bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold rounded-xl border border-indigo-500/30 transition flex items-center justify-between"
            >
              <span>Simulate Team Lead Login</span>
              <span className="text-xs bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-400/30">tl</span>
            </button>

            <button
              onClick={() => handleSimulatedLogin('employee')}
              className="w-full py-3 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold rounded-xl border border-emerald-500/30 transition flex items-center justify-between"
            >
              <span>Simulate Employee Login</span>
              <span className="text-xs bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-400/30">employee</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
