// central API helper for deployment-ready base URL
// ensures that the frontend points to the correct backend host

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * build full API path by appending endpoint to the base URL
 * @param {string} path - path starting with '/'
 * @returns {string}
 */
export function api(path) {
  return `${API_BASE}${path}`;
}
