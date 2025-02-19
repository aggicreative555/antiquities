import { API_AUTH_LOGIN } from '../constants';
import { save } from '../../utilities/authGuard';

/**
 * Logs in a user with the provided email and password.
 *
 * @param {Object} profile - The name for the data collected from the form.
 * @param {string} profile.email - The user's email.
 * @param {string} profile.password - The user's password.
 * @returns {Promise<void>} A promise that resolves when the login is successful.
 * @throws {Error} If the login fails.
 *
 *
 * @example
 * const profile = { email: "user@example.com", password: "password123" };
 * await login(profile);
 * // User logged in, API Key is stored in local storage.
 */

export async function login(profile) {
  try {
    const body = JSON.stringify(profile);
    const response = await fetch(API_AUTH_LOGIN, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    if (response.ok) {
      const result = await response.json();

      const { data: { accessToken, ...user } = {} } = result;

      save('accessToken', accessToken);
      save('user', user);
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
