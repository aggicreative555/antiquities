import { load } from '../utilities/authGuard';

/**
 * Generates HTTP headers for API requests, including Content-Type, Authorization, and API key.
 *
 * @async
 * @function headers
 * @returns {Promise<Object>} A headers object containing:
 *   - `Content-Type`: Set to "application/json".
 *   - `Authorization`: Bearer token for user authentication.
 *   - `X-Noroff-API-Key`: API key for the service.
 * @throws {Error} If the access token or API key is missing.
 *
 */

export async function headers() {
  const accessToken = load('accessToken');
  const apiKey = localStorage.getItem('apiKey');

  try {
    if (!accessToken) {
      throw new Error('Authorization token is missing. Please log in.');
    }

    if (!apiKey) {
      throw new Error('API Key is missing. Please retrieve it first.');
    }

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': apiKey,
    };
  } catch (error) {
    console.error('Error generating headers');
    throw error;
  }
}

/**
 * Attaches headers to an API request and performs the fetch.
 *
 * @async
 * @function getHeaders
 * @param {string} url - The API endpoint URL to fetch.
 * @param {Object} [options={}] - Additional options for the fetch request (e.g., method, body).
 * @returns {Promise<Response>} The fetch response object.
 * @throws {Error} If fetching the API fails.
 *
 * @example
 * const url = "https://api.example.com/resource";
 * const options = {
 * method: "POST",
 * body: JSON.stringify({ key: "value" })
 * };
 *
 * try {
 *   const response = await getHeaders(url, options);
 *   console.log(await response.json());
 * } catch (error) {
 *   console.error("Error fetching headers:", error.message);
 * }
 */

export async function getHeaders(url, options) {
  const headerOptions = await headers();

  try {
    return fetch(url, {
      ...options,
      headers: headerOptions,
    });
  } catch (error) {
    console.log('Error fetching headers:', error.message);
    throw error;
  }
}
