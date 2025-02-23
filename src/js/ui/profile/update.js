import { load } from '../../utilities/authGuard';
import { updateProfile } from '../../api/profile/update';

/**
 * Updates logged user profile by submitting user-modified data to the API.
 *
 * @async
 * @function onUpdateProfile
 * @param {Event} event - The form submission event.
 * @throws {Error} If the user is missing from local storage or the update operation fails.
 *
 */

export async function onUpdateProfile(event) {
  event.preventDefault();

  const storedUser = load('user');

  if (!storedUser) {
    console.error('User must be logged in to edit form.');
    return;
  }

  const form = event.target;
  const formData = new FormData(form);
  const profileData = Object.fromEntries(formData.entries());

  const bio = profileData.bio || '';
  const avatar = profileData.avatar
    ? { url: profileData.avatar.url, alt: profileData.avatar.alt || '' }
    : null;

  const editButton = form.querySelector('#editProfileButton');
  // Disable the edit button to prevent multiple submissions
  editButton.disabled = true;
  editButton.textContent = 'Updating...';

  try {
    await updateProfile(storedUser.name, { bio, avatar });

    alert('Profile successfully updated!');

    window.location.href = '/profile/';
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile. Please try again.');
  } finally {
    // Re-enable the button after a short delay
    setTimeout(() => {
      editButton.disabled = false;
      editButton.textContent = 'Update Profile'; // Reset the button text
    }, 3000); // Re-enable
  }
}
