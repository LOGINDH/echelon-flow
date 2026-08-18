import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTLProjects, createTask } from '../api/tl';
import toast from 'react-hot-toast';
import {
  PlusCircle,
  FolderKanban,
  User,
  Calendar,
  Type,
  ArrowLeft,
  Info,
  CheckCircle2,
} from 'lucide-react';

export default function CreateTask() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    project_id: '',
    title: '',
    assigned_to_employee: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Load TL's assigned projects for the Project Dropdown
  useEffect(() => {
    async function loadProjects() {
      if (!user?.id) return;
      try {
        const data = await getTLProjects(user.id);
        const list = Array.isArray(data) ? data : data.projects || [];
        setProjects(list);
        if (list.length > 0) {
          setFormData((prev) => ({ ...prev, project_id: list[0].id || '' }));
        }
      } catch (err) {
        toast.error(`Failed to load projects: ${err.message}`);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadProjects();
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.project_id) {
      toast.error('Please select a project.');
      return;
    }
    if (!formData.title.trim()) {
      toast.error('Task title is required.');
      return;
    }
    if (!formData.assigned_to_employee) {
      toast.error('Please enter or select an Employee ID.');
      return;
    }
    if (!formData.start_date) {
      toast.error('Start date is required.');
      return;
    }
    if (!formData.end_date) {
      toast.error('End date is required.');
      return;
    }

    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      toast.error('End date cannot be earlier than start date.');
      return;
    }

    if (!user?.id) {
      toast.error('User session error. Please log in again.');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Assigning task...');

    try {
      const response = await createTask({
        tl_id: user.id, // Automatically pulled from logged-in TL user context
        project_id: parseInt(formData.project_id, 10),
        title: formData.title.trim(),
        assigned_to_employee: parseInt(formData.assigned_to_employee, 10),
        start_date: formData.start_date,
        end_date: formData.end_date,
      });

      toast.success(response?.message || 'Task assigned successfully!', { id: toastId });

      // Reset form
      setFormData({
        project_id: projects[0]?.id || '',
        title: '',
        assigned_to_employee: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
      });
    } catch (err) {
      toast.error(err.message || 'Failed to create task', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
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
            <PlusCircle size={28} color="#f97316" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Create Task</h1>
            <p className="subtext">Assign a new task to an employee under an assigned project.</p>
          </div>
        </div>
      </div>

      {/* Contract Notice Alert regarding Employee GET endpoint */}
      <div
        className="glass-card"
        style={{
          padding: '14px 18px',
          borderRadius: '14px',
          background: 'rgba(249, 115, 22, 0.1)',
          border: '1px solid rgba(249, 115, 22, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.825rem',
          color: 'var(--text-secondary)',
        }}
      >
        <Info size={20} color="#f97316" style={{ shrink: 0 }} />
        <div>
          <strong style={{ color: '#fff' }}>API Contract Note:</strong> Project dropdown is populated directly from{' '}
          <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#fb923c' }}>
            GET /tl/projects/
          </code>
          . Since the API spec has no GET endpoint to fetch TL employees, enter the Employee ID (e.g. 3) to assign.
        </div>
      </div>

      {/* Form Glass Card */}
      <div className="glass-card" style={{ padding: '36px 32px' }}>
        <form onSubmit={handleSubmit}>
          {/* Project Dropdown */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Select Project <span style={{ color: 'var(--accent-amber)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <FolderKanban size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
              <select
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                disabled={submitting || loadingProjects}
                className="glass-input"
                style={{ paddingLeft: '44px', cursor: 'pointer' }}
                required
              >
                {loadingProjects ? (
                  <option value="" style={{ background: '#1c120d' }}>Loading projects...</option>
                ) : projects.length === 0 ? (
                  <option value="" style={{ background: '#1c120d' }}>No projects available</option>
                ) : (
                  projects.map((p) => (
                    <option key={p.id} value={p.id} style={{ background: '#1c120d', color: '#fff' }}>
                      {p.name || p.title} (ID: #{p.id})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Task Title */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Task Title <span style={{ color: 'var(--accent-amber)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Type size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                name="title"
                className="glass-input"
                style={{ paddingLeft: '44px' }}
                placeholder="e.g. Build Login Page"
                value={formData.title}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>
          </div>

          {/* Assigned Employee ID */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Assigned Employee ID <span style={{ color: 'var(--accent-amber)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="number"
                name="assigned_to_employee"
                className="glass-input"
                style={{ paddingLeft: '44px' }}
                placeholder="Enter Employee ID (e.g. 3)"
                value={formData.assigned_to_employee}
                onChange={handleChange}
                disabled={submitting}
                min="1"
                required
              />
            </div>
          </div>

          {/* Start & End Dates Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Start Date <span style={{ color: 'var(--accent-amber)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="date"
                  name="start_date"
                  className="glass-input"
                  style={{ paddingLeft: '44px' }}
                  value={formData.start_date}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                End Date <span style={{ color: 'var(--accent-amber)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="date"
                  name="end_date"
                  className="glass-input"
                  style={{ paddingLeft: '44px' }}
                  value={formData.end_date}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                />
              </div>
            </div>
          </div>

          {/* Read-Only Context Confirmation */}
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
              onClick={() =>
                setFormData({
                  project_id: projects[0]?.id || '',
                  title: '',
                  assigned_to_employee: '',
                  start_date: new Date().toISOString().split('T')[0],
                  end_date: '',
                })
              }
              className="btn-secondary"
              disabled={submitting}
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting || loadingProjects || projects.length === 0}
              style={{ minWidth: '160px' }}
            >
              {submitting ? 'Assigning...' : 'Assign Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
