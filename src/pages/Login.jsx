import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import { ShieldCheck, User, Lock, ArrowRight, Info } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tl');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole !== 'tl') {
      toast.error(
        `The ${selectedRole.toUpperCase()} workspace is not available in this build. Only Team Lead workspace is supported.`,
        { duration: 4000, icon: '⚠️' }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Please enter both username and password.');
      return;
    }

    if (role !== 'tl') {
      toast.error('Only Team Lead login is enabled in this workspace build.', { icon: '🚫' });
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Authenticating...');

    try {
      const response = await loginUser({ username, password, role: 'tl' });
      
      if (response && response.success) {
        toast.success(`Welcome back, ${response.user?.full_name || response.user?.username || 'Team Lead'}!`, { id: toastId });
        login(response.user);
        navigate('/tl');
      } else {
        toast.error(response?.message || 'Login failed. Please check credentials.', { id: toastId });
      }
    } catch (err) {
      toast.error(err.message || 'Login failed', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      zIndex: 1,
    }}>
      <div className="glass-card" style={{
        maxWidth: '440px',
        width: '100%',
        padding: '40px 32px',
        backdropFilter: 'blur(24px) saturate(180%)',
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(234, 88, 12, 0.1) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 20px rgba(249, 115, 22, 0.25)',
          }}>
            <ShieldCheck size={32} color="#f97316" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Echelon Flow</h1>
          <p className="subtext" style={{ fontSize: '0.9rem' }}>Team Lead Workspace Portal</p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Select Workspace Role
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr 1fr',
            gap: '6px',
            background: 'rgba(15, 9, 6, 0.7)',
            padding: '4px',
            borderRadius: '14px',
            border: '1px solid var(--glass-border)',
          }}>
            {[
              { id: 'admin', label: 'Admin' },
              { id: 'tl', label: 'Team Lead' },
              { id: 'employee', label: 'Employee' },
            ].map((r) => {
              const active = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r.id)}
                  style={{
                    padding: '9px 6px',
                    borderRadius: '10px',
                    border: active ? '1px solid rgba(249, 115, 22, 0.5)' : '1px solid transparent',
                    background: active ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(234, 88, 12, 0.2) 100%)' : 'transparent',
                    color: active ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.825rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {role !== 'tl' && (
            <div style={{
              marginTop: '10px',
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: '#fca5a5',
            }}>
              <Info size={16} style={{ shrink: 0 }} />
              <span>Only Team Lead role is active in this build spec.</span>
            </div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="glass-input"
                style={{ paddingLeft: '44px' }}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                className="glass-input"
                style={{ paddingLeft: '44px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || role !== 'tl'}
            style={{ width: '100%', padding: '14px' }}
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                Sign In to TL Workspace <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
