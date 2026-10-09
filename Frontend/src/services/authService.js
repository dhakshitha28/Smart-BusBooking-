import { api } from './api';

/**
 * authService encapsulates authentication and user profile network calls.
 *
 * Why this file exists:
 * Isolates the auth REST API contracts from UI view components.
 */
export const authService = {
  /**
   * Registers a new passenger account.
   * Note: The payload deliberately does not contain a role field.
   */
  async register(registrationData) {
    return await api.post('/api/auth/register', registrationData);
  },

  /**
   * Submits credentials for authentication.
   * Returns: { success, message, accessToken, userId, fullName, email, role }
   */
  async login(credentials) {
    const response = await api.post('/api/auth/login', credentials);
    if (response?.accessToken) {
      localStorage.setItem('smartbus_token', response.accessToken);
      localStorage.setItem('smartbus_user', JSON.stringify({
        userId: response.userId,
        fullName: response.fullName,
        email: response.email,
        role: response.role
      }));
    }
    return response;
  },

  /**
   * Fetches user profile from the User Service via API Gateway.
   */
  async getProfile() {
    return await api.get('/api/users/profile');
  },

  /**
   * Clears authentication session storage.
   */
  logout() {
    localStorage.removeItem('smartbus_token');
    localStorage.removeItem('smartbus_user');
  },

  getCurrentUser() {
    const raw = localStorage.getItem('smartbus_user');
    return raw ? JSON.parse(raw) : null;
  },

  getToken() {
    return localStorage.getItem('smartbus_token');
  }
};
