import { Clock, PlayCircle, CheckCircle2 } from 'lucide-react';

/**
 * High contrast status badge pill component.
 * Uses tokens: pending, in_progress, completed
 */
export default function StatusBadge({ status }) {
  const normalizedStatus = (status || 'pending').toLowerCase().replace(/\s+/g, '_');

  const getStatusConfig = () => {
    switch (normalizedStatus) {
      case 'in_progress':
      case 'inprogress':
      case 'active':
        return {
          label: 'In Progress',
          className: 'status-badge in_progress',
          icon: <PlayCircle size={14} />,
        };
      case 'completed':
      case 'done':
        return {
          label: 'Completed',
          className: 'status-badge completed',
          icon: <CheckCircle2 size={14} />,
        };
      case 'pending':
      default:
        return {
          label: 'Pending',
          className: 'status-badge pending',
          icon: <Clock size={14} />,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={config.className}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
}
