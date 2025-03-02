import { onLogout } from '../auth/logout';
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
