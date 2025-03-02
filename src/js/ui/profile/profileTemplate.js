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

  const placeholderImage = 'https://images.unsplash.com/photo-1544364097-1e09525e2f37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D';


  const container = document.createElement('div');
  container.className = 'd-flex flex-column justify-content-center align-items-center position-relative';

  // Add go back function

  const backContainer = document.createElement('a');
  backContainer.className = 'd-flex align-items-center text-decoration-none back-button px-3 py-2';
  backContainer.href = '/';

  const backIcon = document.createElement('img');
  backIcon.className = 'arrow-icon';
  backIcon.src = '/icons/arrow-icon-antiquities.svg';
  backIcon.alt = 'Dropdown arrow';
  backIcon.style.transform = 'rotate(180deg)';
  backIcon.style.height = '48px';
  backContainer.appendChild(backIcon);

  parent.appendChild(backContainer);

  // Add avatar

  const avatarContainer = document.createElement('div');
  avatarContainer.className = 'img-fluid profile-picture-container border-black my-5';

  const avatarUrl = profileData.avatar?.url && typeof profileData.avatar === 'object' ? profileData.avatar.url : placeholderImage;
  avatarContainer.style.backgroundImage = `url('${avatarUrl}')`;

  avatarContainer.style.height = '250px';
  avatarContainer.style.width = '200px';
  avatarContainer.style.backgroundSize = 'cover';


  avatarContainer.setAttribute(
    'aria-label',
    profileData.avatar?.alt || 'Profile image without description',
  );

  container.appendChild(avatarContainer);


  const contentContainer = document.createElement('div');
  contentContainer.className = 'd-flex flex-column gap-3 frame p-5 mb-5';
  container.appendChild(contentContainer);

  // Add name
  const name = document.createElement('h1');
  name.className = 'capitalize heading-M fst-italic';
  name.textContent = profileData.name || 'Emilia';

  contentContainer.appendChild(name);

  // Line 
  const line = document.createElement('span');
  line.className = "line"

  contentContainer.appendChild(line);

  // Add credits
  const credit = document.createElement('h2');
  credit.className = 'color-brown-500 heading fst-italic ';
  credit.textContent = `NOK ${profileData.credits ?? '0'}`;
  contentContainer.appendChild(credit);

  
  // Add wins count

  const winsCount = document.createElement('p');
  winsCount.className = 'caption color-brown-500 capitalize';
  winsCount.textContent = `My wins: ${profileData._count?.wins ?? '0'}`;
  contentContainer.appendChild(winsCount);

  
  // Add description

  const descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'd-flex flex-column my-5'
  container.appendChild(descriptionContainer);


  const descriptionTitle = document.createElement('h3');
  descriptionTitle.className = 'heading text-center fw-bolder fst-italic py-3';
  descriptionTitle.textContent = 'About Me';
  descriptionContainer.appendChild(descriptionTitle);

  const descriptionFrame = document.createElement('div');
  descriptionFrame.className = 'frame-2 px-5';
  descriptionFrame.style.cursor = 'pointer';
  descriptionContainer.appendChild(descriptionFrame);

  const description = document.createElement('p');
  description.className = 'caption text-brown-500 mx-5';
  description.textContent = profileData.bio || 'I sell products such as...';
  descriptionFrame.appendChild(description);

  // Edit Profile Button
  const editProfileButton = document.createElement('button');
  editProfileButton.className = 'btn btn-custom-rounded rounded-circle d-flex justify-content-center align-items-center position-absolute';
  editProfileButton.style.width = '40px';
  editProfileButton.style.height = '40px';
  editProfileButton.style.top = '25%';
  editProfileButton.style.left = '52%';
  editProfileButton.setAttribute('data-bs-toggle', 'tooltip');
  editProfileButton.setAttribute('title', 'Edit Profile');

  // Bootstrap pen icon
  const editIcon = document.createElement('i');
  editIcon.className = 'bi bi-pen-fill';
  editIcon.style.fontSize = '1.2rem';

  editProfileButton.appendChild(editIcon);
  avatarContainer.appendChild(editProfileButton);


  setTimeout(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
  }, 50);


  editProfileButton.addEventListener('click', () => {
    const profileContainer = document.querySelector('#profileContainer');
    const editProfileContainer = document.querySelector('#editProfileContainer');
    const buttonGroup = document.querySelector('#buttonGroup');

    profileContainer.classList.add('d-none');

    if (buttonGroup) {
      buttonGroup.classList.add('d-none');
    }

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
