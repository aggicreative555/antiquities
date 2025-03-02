import { remove } from '../../utilities/authGuard';

/**
 * Logs out the user by removing the access token from storage and redirecting to the login page.
 *
 * @function onLogout
 * @throws {Error} If accessToken or user is missing or cannot be removed.
 *
 */
export function onLogout() {
  try {
    remove('accessToken');
    sessionStorage.removeItem('accessToken');
    remove('user');
    sessionStorage.removeItem('user');

    alert('You are now logged out.');
    window.location.reload();
  } catch (error) {
    console.error('Logout unsuccessful. Refresh the page and try again.');
    throw error;
  }
}
