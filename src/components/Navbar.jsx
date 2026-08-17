import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Shield, Users, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Global Top Navigation Bar Component
 */
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-3.5 h-3.5 text-purple-400" />;
      case 'tl':
        return <Users className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <UserCheck className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/30';
      case 'tl':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <header className="h-16 glass-panel border-b border-slate-800 sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-white tracking-tight">Echelon Flow</h2>
        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700 font-mono">
          v1.0 Scaffold
        </span>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pl-3 pr-2 py-1 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-100">{user.name}</span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.2 rounded border ${getRoleBadgeStyle(user.role)}`}>
                {getRoleIcon(user.role)}
                {user.role}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-500/30 transition shadow-sm"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="text-xs px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
        >
          Sign In
        </button>
      )}
    </header>
  );
}
