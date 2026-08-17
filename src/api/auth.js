import { apiFetch } from './config.js';

/**
 * Authenticates a user with username, password, and role.
 *
 * @param {string} username
 * @param {string} password
 * @param {string} role
 * @returns {Promise<any>}
 */
export async function login(username, password, role) {
  return apiFetch('/echelon_flow/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password, role }),
  });
}
