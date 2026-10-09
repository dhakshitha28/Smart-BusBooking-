/**
 * api.js provides a central HTTP client with base URL resolution and Bearer token injection.
 *
 * Why this file exists:
 * Consolidates all network calls through the API Gateway URL (VITE_API_BASE_URL)
 * so endpoints aren't hardcoded in multiple components.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('smartbus_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = data?.message || (data?.errors ? Object.values(data.errors).join(', ') : 'Network request failed');
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  del: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};
