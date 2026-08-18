import { apiClient, extractErrorMessage } from './client';

/**
 * 5.1 View Assigned Projects
 * Endpoint: GET /echelon_flow/tl/projects/?tl_id={id}
 * 
 * @param {number|string} tlId - The logged-in TL user ID
 * @returns {Promise<Array|Object>} Assigned projects list or data
 */
export const getTLProjects = async (tlId) => {
  try {
    const response = await apiClient.get(`tl/projects/?tl_id=${tlId}`);
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * 5.2 Create Employee
 * Endpoint: POST /echelon_flow/tl/create-employee/
 * 
 * @param {Object} payload
 * @param {number|string} payload.tl_id - Must automatically come from logged-in TL
 * @param {string} payload.username
 * @param {string} payload.password
 * @param {string} payload.full_name
 * @returns {Promise<Object>} Backend response
 */
export const createEmployee = async ({ tl_id, username, password, full_name }) => {
  try {
    const response = await apiClient.post('tl/create-employee/', {
      tl_id,
      username,
      password,
      full_name,
    });
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * 5.3 Create Task
 * Endpoint: POST /echelon_flow/tl/tasks/create/
 * 
 * @param {Object} payload
 * @param {number|string} payload.tl_id - Must automatically come from logged-in TL
 * @param {number|string} payload.project_id
 * @param {string} payload.title
 * @param {number|string} payload.assigned_to_employee
 * @param {string} payload.start_date - YYYY-MM-DD
 * @param {string} payload.end_date - YYYY-MM-DD
 * @returns {Promise<Object>} Backend response
 */
export const createTask = async ({ tl_id, project_id, title, assigned_to_employee, start_date, end_date }) => {
  try {
    const response = await apiClient.post('tl/tasks/create/', {
      tl_id,
      project_id,
      title,
      assigned_to_employee,
      start_date,
      end_date,
    });
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

/**
 * 5.4 Update Project Status
 * Endpoint: PATCH /echelon_flow/tl/projects/{project_id}/status/
 * 
 * @param {number|string} projectId - ID of the project to update
 * @param {Object} payload
 * @param {number|string} payload.tl_id - Must automatically come from logged-in TL
 * @param {string} payload.status - 'pending' | 'in_progress' | 'completed'
 * @returns {Promise<Object>} Backend response
 */
export const updateProjectStatus = async (projectId, { tl_id, status }) => {
  try {
    const response = await apiClient.patch(`tl/projects/${projectId}/status/`, {
      tl_id,
      status,
    });
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};
