import { onUpdateProfile } from './update';

export function editProfileTemplate(profile, parent) {
  if (!profile || !parent || !profile.data) {
    parent.innerHTML = `<p>Profile data is unavailable. Please log in or try again later. </p>`;
    return;
  }

  const profileData = profile.data;

  parent.innerHTML = '';

  // Add go back function

  const backContainer = document.createElement('a');
  backContainer.className = '';
  backContainer.textContent = 'Back';
  backContainer.href = '/profile';

  const backIcon = document.createElement('span');
  backIcon.className = '';
  backIcon.textContent = '';
  backContainer.appendChild(backIcon);

  parent.appendChild(backContainer);

  const form = document.createElement('form');
  form.name = 'updateProfile';
  form.id = 'updateProfile';
  form.addEventListener('submit', onUpdateProfile);

  // Add bio field
  const bioLabel = document.createElement('label');
  bioLabel.htmlFor = 'bio';
  bioLabel.textContent = 'About Me';
  const bioInput = document.createElement('input');
  bioInput.className = '';
  bioInput.id = 'bio';
  bioInput.type = 'text';
  bioInput.name = 'bio';
  bioInput.value = profileData.bio || '';
  bioInput.title =
    'Write about your listings, yourself, your passion for antiques ...';
  bioInput.placeholder = 'I sell products such as ...';

  // Add avatar field
  const avatarLabel = document.createElement('label');
  avatarLabel.htmlFor = 'avatar';
  avatarLabel.textContent = 'Avatar';
  const avatarInput = document.createElement('input');
  avatarInput.className = '';
  avatarInput.type = 'url';
  avatarInput.name = 'avatar';
  avatarInput.id = 'avatar';
  avatarInput.value = profileData.avatar?.url || '';

  // Add submit button
  const editButton = document.createElement('button');
  editButton.id = 'editProfileButton';
  editButton.textContent = 'Update Profile';

  form.appendChild(bioLabel);
  form.appendChild(bioInput);
  form.appendChild(avatarLabel);
  form.appendChild(avatarInput);
  form.appendChild(editButton);

  parent.appendChild(form);
}
