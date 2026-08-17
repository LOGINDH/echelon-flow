import { apiFetch } from './config.js';

/**
 * Employee API Endpoints
 */

export async function getEmployeeTasks(employeeId) {
  return apiFetch(`/echelon_flow/employee/tasks/?employee_id=${employeeId}`, {
    method: 'GET',
  });
}

export async function updateTaskStatus(taskId, employeeId, status) {
  return apiFetch(`/echelon_flow/employee/tasks/${taskId}/status/`, {
    method: 'PATCH',
    body: JSON.stringify({ employee_id: employeeId, status }),
  });
}
