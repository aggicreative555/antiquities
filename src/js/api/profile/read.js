import { API_AUCTION_PROFILES } from '../constants';
import { getHeaders } from '../headers';
/**
 * Reads a logged in profile.
 *
 * @async
 * @function readProfile
 * @param {string|number} username - The username of the profile to read.
 * @returns {Promise<object>} The response data.
 * @throws {Error} If the API request fails or the id is absent.
 *
 * @example
 * const readProfile = await readProfile('user_1234');
 * console.log(readProfile) // Outputs specific profile data.
 */

export async function readProfile(username) {
  const response = await getHeaders(`${API_AUCTION_PROFILES}/${username}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(
      `Failed to read profile with username ${username}: ${response.statusText}`,
    );
  }

  const readProfile = await response.json();
  return readProfile;
}

export async function readProfiles(limit, page) {}
