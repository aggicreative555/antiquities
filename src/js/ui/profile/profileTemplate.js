import { readProfile } from '../../api/profile/read';
import { load } from '../../utilities/authGuard';
import { editProfileTemplate } from './updateTemplate';

/**
 * Renders profile template into a parent element.
 *
 * @function renderProfileTemplate
 * @param {Object} postData - Data for the post
 * @param {HTMLElement} parent - Parent element where the post will be rendered.
 */

export function renderProfileTemplate(profile, parent) {
  if (!profile || !parent || !profile.data) {
    parent.innerHTML = `<p>Profile data is unavailable. Please log in or try again later. </p>`;
    return;
  }

  const profileData = profile.data;

  parent.innerHTML = '';

  const placeholderImage =
    'https://images.unsplash.com/photo-1544364097-1e09525e2f37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const container = document.createElement('div');
  container.className = 'main-container';

  // Add go back function

  const backContainer = document.createElement('a');
  backContainer.className = '';
  backContainer.textContent = 'Back';
  backContainer.href = '/';

  const backIcon = document.createElement('span');
  backIcon.className = '';
  backIcon.textContent = '';
  backContainer.appendChild(backIcon);

  parent.appendChild(backContainer);

  // Add avatar

  const avatarContainer = document.createElement('div');
  avatarContainer.className = 'w-100 h-100 img-responsive';

  const avatarUrl =
    profileData.avatar?.url && typeof profileData.avatar === 'object'
      ? profileData.avatar.url
      : placeholderImage;

  avatarContainer.style.backgroundImage = `url('${avatarUrl}')`;

  avatarContainer.setAttribute(
    'aria-label',
    profileData.avatar?.alt || 'Profile image without description',
  );

  container.appendChild(avatarContainer);

  const contentContainer = document.createElement('div');
  contentContainer.className = 'profile-content';
  container.appendChild(contentContainer);

  // Add name
  const name = document.createElement('h1');
  name.className = 'name';
  name.textContent = profileData.name || 'Name';

  contentContainer.appendChild(name);

  // Add credits
  const credit = document.createElement('h2');
  credit.className = '';
  credit.textContent = `Credits: ${profileData.credits ?? '0'}`;
  contentContainer.appendChild(credit);

  // Add description

  const descriptionTitle = document.createElement('h3');
  descriptionTitle.className = '';
  descriptionTitle.textContent = 'About Me';
  contentContainer.appendChild(descriptionTitle);

  const description = document.createElement('p');
  description.className = '';
  description.textContent = profileData.bio || 'I sell products such as...';
  container.appendChild(description);

  // Add wins count

  const winsCount = document.createElement('p');
  winsCount.className = '';
  winsCount.textContent = `Wins: ${profileData._count?.wins ?? '0'}`;
  container.appendChild(winsCount);

  // Add edit button

  const editProfileButton = document.createElement('button');
  editProfileButton.className = 'edit-button';
  editProfileButton.id = 'editProfileButton';
  editProfileButton.textContent = 'Edit Profile';
  parent.appendChild(editProfileButton);

  editProfileButton.addEventListener('click', () => {
    const profileContainer = document.querySelector('#profileContainer');
    const editProfileContainer = document.querySelector(
      '#editProfileContainer',
    );
    console.log('clicked');
    profileContainer.classList.add('d-none');
    editProfileContainer.classList.remove('d-none');

    editProfileTemplate(profile, editProfileContainer);
  });

  parent.appendChild(container);
}

/**
 * Fetches and renders the user's profile.
 *
 * @async
 * @function renderProfile
 * @param {string} username - The username of the profile to fetch.
 * @param {HTMLElement} profileContainer - The container where the profile will be displayed.
 */

export async function renderProfile(username, profileContainer) {
  try {
    if (!username || !profileContainer) {
      console.error('Error: Missing username or profile container.');
      return;
    }

    const profileAPI = await readProfile(username);

    if (!profileAPI?.data) {
      profileContainer.innerHTML = `<p>Profile not found.</p>`;
      return;
    }

    const storedUser = load('user');

    if (storedUser.name === profileAPI.data.name) {
      window.history.replaceState({}, '', '/profile/');
    } else {
      window.history.replaceState({}, '', `/profile/${profile.data.name}`);
    }

    renderProfileTemplate(profileAPI, profileContainer);
  } catch (error) {
    console.error('Error loading profile:', error);
    profileContainer.innerHTML = `<p>Failed to load profile. Please log in or try again later.</p>`;
  }
}
