import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  UserPlus,
  CheckSquare,
  PlusCircle,
  User,
  LogOut,
  X,
  Layers,
} from 'lucide-react';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/tl', icon: <LayoutDashboard size={18} />, end: true },
    { label: 'My Projects', path: '/tl/projects', icon: <FolderKanban size={18} /> },
    { label: 'Employees', path: '/tl/employees', icon: <Users size={18} /> },
    { label: 'Create Employee', path: '/tl/create-employee', icon: <UserPlus size={18} /> },
    { label: 'Tasks', path: '/tl/tasks', icon: <CheckSquare size={18} /> },
    { label: 'Create Task', path: '/tl/create-task', icon: <PlusCircle size={18} /> },
    { label: 'Profile', path: '/tl/profile', icon: <User size={18} /> },
  ];

  const handleNavClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className="glass-card sidebar-container"
        style={{
          width: '260px',
          height: 'calc(100vh - 40px)',
          position: 'fixed',
          top: '20px',
          left: mobileOpen ? '20px' : undefined,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          padding: '24px 16px',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s ease',
        }}
      >
        {/* Header & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.4) 0%, rgba(234, 88, 12, 0.2) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(249, 115, 22, 0.3)',
              }}
            >
              <Layers size={20} color="#f97316" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Echelon</h2>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-amber-light)', letterSpacing: '0.05em' }}>TL WORKSPACE</span>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          <button
            onClick={() => setMobileOpen(false)}
            className="mobile-close-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={handleNavClick}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 16px',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                background: isActive ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(234, 88, 12, 0.15) 100%)' : 'transparent',
                border: isActive ? '1px solid rgba(249, 115, 22, 0.4)' : '1px solid transparent',
                boxShadow: isActive ? '0 4px 14px rgba(249, 115, 22, 0.15)' : 'none',
                transition: 'all 0.2s ease',
              })}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Action */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#fca5a5',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
