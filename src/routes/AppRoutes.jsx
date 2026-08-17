import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Page Imports
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProjects from '../pages/AdminProjects';
import AdminCreateProject from '../pages/AdminCreateProject';
import AdminTeamLeads from '../pages/AdminTeamLeads';
import TLDashboard from '../pages/TLDashboard';
import TLProjects from '../pages/TLProjects';
import TLEmployees from '../pages/TLEmployees';
import TLTasks from '../pages/TLTasks';
import TLCreateTask from '../pages/TLCreateTask';
import EmployeeDashboard from '../pages/EmployeeDashboard';
import EmployeeTasks from '../pages/EmployeeTasks';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Admin Workspace Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/projects/create" element={<AdminCreateProject />} />
        <Route path="/admin/team-leads" element={<AdminTeamLeads />} />
      </Route>

      {/* Team Lead Workspace Routes */}
      <Route element={<ProtectedRoute allowedRoles={['tl']} />}>
        <Route path="/tl" element={<TLDashboard />} />
        <Route path="/tl/projects" element={<TLProjects />} />
        <Route path="/tl/employees" element={<TLEmployees />} />
        <Route path="/tl/tasks" element={<TLTasks />} />
        <Route path="/tl/tasks/create" element={<TLCreateTask />} />
      </Route>

      {/* Employee Workspace Routes */}
      <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employee/tasks" element={<EmployeeDashboard defaultTab="tasks" />} />
        <Route path="/employee/profile" element={<EmployeeDashboard defaultTab="profile" />} />
      </Route>

      {/* Default Catch-all Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
