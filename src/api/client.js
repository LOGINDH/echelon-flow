import axios from 'axios';

// Ensure base URL ends with a slash if needed or handled cleanly
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/echelon_flow/';
export const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Extracts human-readable backend error message from dynamic responses.
 */
export const extractErrorMessage = (error) => {
  if (error.response) {
    const data = error.response.data;
    if (typeof data === 'string') return data;
    if (data && typeof data === 'object') {
      if (data.message) return data.message;
      if (data.error) return data.error;
      if (data.detail) return data.detail;
      // If error payload has field validation array or object
      return Object.entries(data)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
        .join(' | ');
    }
  }
  return error.message || 'Network error, please check connection.';
};
