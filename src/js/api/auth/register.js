import { API_AUTH_REGISTER } from '../constants';

/**
 * Registers a new user with the provided details.
 *
 * @param {Object} profile - The registration data.
 * @param {string} data.name - The user's name (required).
 * @param {string} data.email - The user's email address (required).
 * @param {string} data.password - The user's
 *
 * @returns {Promise<Object>} A promise that resolves to the user's registration response.
 *
 * @throws {Error} If the registration fails.
 *
 * @example
 * const profile = {
 * name = "user1",
 * email = "user@example.com",
 * password = "password1234"
 * };
 * const response = await register(profile);
 * console.log(response) // Outputs successful registration response.
 */

export async function register(profile) {
  try {
    const body = JSON.stringify(profile);
    const response = await fetch(API_AUTH_REGISTER, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}
