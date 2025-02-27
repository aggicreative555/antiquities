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
    window.location.href = '/login/';
  } catch (error) {
    console.error('Logout unsuccessful. Refresh the page and try again.');
    throw error;
  }
}

/**
 * Attaches a click event listener to the logout button to handle user logout.
 *
 * @function setLogoutListener
 * @throws {Error} If the logout button is not found in the DOM.
 *
 */

export function setLogoutListener() {
  try {
    const logoutButton = document.querySelector('#logoutButton');

    if (logoutButton) {
      logoutButton.addEventListener('click', onLogout);
    } else {
      throw new Error('Logout button not found');
    }
  } catch (error) {
    console.error('Logout listener not working.');
    throw error;
  }
}
