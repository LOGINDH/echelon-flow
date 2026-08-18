import { apiClient, extractErrorMessage } from './client';

/**
 * Login function matching section 3 of specification.
 * Endpoint: POST /echelon_flow/login/
 * 
 * @param {Object} credentials 
 * @param {string} credentials.username
 * @param {string} credentials.password
 * @param {string} credentials.role - 'admin' | 'tl' | 'employee'
 * @returns {Promise<Object>} Backend response { success, message, user }
 */
export const loginUser = async ({ username, password, role }) => {
  try {
    const response = await apiClient.post('login/', {
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};
