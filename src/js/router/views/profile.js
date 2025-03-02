import { authGuard, load } from '../../utilities/authGuard';
import { renderProfile } from '../../ui/profile/profileTemplate';

async function initializeProfilePage() {
  const profileContainer = document.querySelector('#profileContainer');

  try {
    authGuard();

    const storedUser = load('user');

    if (!storedUser?.name) {
      console.error('Error: No logged-in user found.');
      window.location.href = '/login';
      return;
    }

    await renderProfile(storedUser.name, profileContainer);
  } catch (error) {
    console.error('Error setting up authGuard', error);
  }

  try {
    setLogoutListener();
  } catch (error) {
    console.error('Error setting up logout', error);
  }
}

initializeProfilePage();
