import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createEmployee } from '../api/tl';
import toast from 'react-hot-toast';
import { UserPlus, User, Lock, AlignLeft, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CreateEmployee() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.username.trim()) {
      toast.error('Username is required.');
      return;
    }
    if (!formData.password.trim()) {
      toast.error('Password is required.');
      return;
    }
    if (!formData.full_name.trim()) {
      toast.error('Full Name is required.');
      return;
    }

    if (!user?.id) {
      toast.error('User session error. Please log in again.');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Creating employee account...');

    try {
      const response = await createEmployee({
        tl_id: user.id, // Automatically injected from logged-in TL user context
        username: formData.username.trim(),
        password: formData.password.trim(),
        full_name: formData.full_name.trim(),
      });

      toast.success(
        response?.message || `Employee "${formData.full_name}" created successfully!`,
        { id: toastId }
      );

      // Reset form on success
      setFormData({ username: '', password: '', full_name: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to create employee', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back Button & Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '0.825rem', marginBottom: '16px' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              padding: '12px',
              borderRadius: '16px',
              background: 'rgba(249, 115, 22, 0.18)',
              border: '1px solid rgba(249, 115, 22, 0.35)',
              boxShadow: '0 4px 16px rgba(249, 115, 22, 0.2)',
            }}
          >
            <UserPlus size={28} color="#f97316" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Create Employee</h1>
            <p className="subtext">Add a new employee team member to your workspace.</p>
          </div>
        </div>
      </div>

      {/* Form Glass Card */}
      <div className="glass-card" style={{ padding: '36px 32px' }}>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Full Name <span style={{ color: 'var(--accent-amber)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <AlignLeft size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                name="full_name"
                className="glass-input"
                style={{ paddingLeft: '44px' }}
                placeholder="e.g. Ravi Kumar"
                value={formData.full_name}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>
          </div>

          {/* Username */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Username <span style={{ color: 'var(--accent-amber)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                name="username"
                className="glass-input"
                style={{ paddingLeft: '44px' }}
                placeholder="e.g. ravi"
                value={formData.username}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Password <span style={{ color: 'var(--accent-amber)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                name="password"
                className="glass-input"
                style={{ paddingLeft: '44px' }}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>
          </div>

          {/* Automatic TL ID Context Confirmation (Read-Only Badge) */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(15, 9, 6, 0.6)',
              border: '1px solid var(--glass-border)',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Assigned Team Lead ID:</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-amber-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> Automatic (TL #{user?.id})
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setFormData({ username: '', password: '', full_name: '' })}
              className="btn-secondary"
              disabled={submitting}
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ minWidth: '160px' }}
            >
              {submitting ? 'Creating...' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
