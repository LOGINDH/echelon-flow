export const BASE_URL = 'http://127.0.0.1:8000';

/**
 * Shared fetch wrapper for all API endpoints.
 * @param {string} endpoint - The relative API endpoint path
 * @param {RequestInit} options - Standard fetch options
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const storedUser = localStorage.getItem('echelon_user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }
    } catch (e) {
      console.warn('Failed to parse user session token from localStorage', e);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
