import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FolderKanban,
  FolderPlus,
  Users,
  UserCheck,
  CheckSquare,
  PlusSquare,
  Shield,
  Briefcase,
  ListTodo
} from 'lucide-react';

/**
 * Dynamic Role-Based Sidebar Navigation Component
 */
export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role;

  const adminNav = [
    { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Projects List', path: '/admin/projects', icon: FolderKanban, end: true },
    { label: 'Create Project', path: '/admin/projects/create', icon: FolderPlus, end: true },
    { label: 'Team Leads', path: '/admin/team-leads', icon: Users, end: true },
  ];

  const tlNav = [
    { label: 'TL Dashboard', path: '/tl', icon: LayoutDashboard, end: true },
    { label: 'My Projects', path: '/tl/projects', icon: Briefcase, end: true },
    { label: 'Team Employees', path: '/tl/employees', icon: UserCheck, end: true },
    { label: 'Tasks List', path: '/tl/tasks', icon: ListTodo, end: true },
    { label: 'Create Task', path: '/tl/tasks/create', icon: PlusSquare, end: true },
  ];

  const employeeNav = [
    { label: 'Employee Dashboard', path: '/employee', icon: LayoutDashboard, end: true },
    { label: 'Assigned Tasks', path: '/employee/tasks', icon: CheckSquare, end: true },
  ];

  let navItems = [];
  let roleTitle = 'Navigation';

  if (role === 'admin') {
    navItems = adminNav;
    roleTitle = 'Admin Portal';
  } else if (role === 'tl') {
    navItems = tlNav;
    roleTitle = 'Team Lead Workspace';
  } else if (role === 'employee') {
    navItems = employeeNav;
    roleTitle = 'Employee Workspace';
  }

  if (!user || navItems.length === 0) {
    return null;
  }

  return (
    <aside className="w-64 glass-panel border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="px-3 py-2 mb-4 text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <Shield className="w-4 h-4 text-indigo-400" />
        <span>{roleTitle}</span>
      </div>

      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`
              }
            >
              <Icon className="w-4 h-4 text-current" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 text-center font-mono">
        Role: <span className="text-slate-300 uppercase font-bold">{role}</span>
      </div>
    </aside>
  );
}
