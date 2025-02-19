/**
 * Ensures the user is authenticated by checking for an access token in localStorage.
 * If the user is not authenticated, redirects them to the login page.
 *
 * @function authGuard
 * @throws {Error} If the user is not logged in (access token is missing).
 *
 */

export function authGuard() {
  if (!localStorage.accessToken) {
    alert('You must be logged in to view this page');
    window.location.href = '/auth/login/';
  }
}

/**
 * Saves a value to localStorage under the specified key.
 *
 * @function save
 * @param {string} key - The key under which the value will be stored.
 * @param {*} value - The value to store. Can be any data type, which will be stringified.
 *
 * // Example usage: Save user data to localStorage
 * save("userProfile", { name: "User", email: "user@mail.com" });
 *
 */

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads and parses a value from localStorage.
 *
 * @function load
 * @param {string} key - The key for which the value needs to be retrieved.
 * @returns {*} The parsed value from localStorage, or an error object if parsing fails.
 * @throws {Error} If there is an error retrieving or parsing the value from localStorage.
 *
 * // Example usage: Load user profile from localStorage
 * const userProfile = load("userProfile");
 *
 */

export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error('Error loading key', error);
    return error;
  }
}

/**
 * Removes a value from localStorage.
 *
 * @function remove
 * @param {string} key - The key to remove from localStorage.
 *
 * @example
 * // Example usage: Remove user session data
 * remove("userProfile");
 */

export function remove(key) {
  localStorage.removeItem(key);
}
