import { onUpdateProfile } from './update';

export function editProfileTemplate(profile, parent) {
  if (!profile || !parent || !profile.data) {
    parent.innerHTML = `<p>Profile data is unavailable. Please log in or try again later. </p>`;
    return;
  }


  const profileData = profile.data;

  parent.innerHTML = '';

  const placeholderImage = 'https://images.unsplash.com/photo-1544364097-1e09525e2f37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D';

  const container = document.createElement('div');
  container.className = 'd-flex flex-column justify-content-center align-items-center position-relative w-100';
  parent.appendChild(container);

  // Add go back function

  const banner = document.createElement('div');
  banner.className = 'frame px-5 my-5 bg-brown-300';
  container.appendChild(banner);

  const bannerHeading = document.createElement('h1');
  bannerHeading.className = 'display-S text-center capitalize';
  bannerHeading.textContent = 'Edit my profile';
  
  banner.appendChild(bannerHeading);
  
 
  const backContainer = document.createElement('a');
  backContainer.className = 'd-flex align-items-center text-decoration-none back-button px-3 py-2 position-absolute';
  backContainer.style.top = '25%';
  backContainer.style.left = '0%';
  backContainer.href = '/profile/';

  const backIcon = document.createElement('img');
  backIcon.className = 'arrow-icon';
  backIcon.src = '/icons/arrow-icon-antiquities.svg';
  backIcon.alt = 'Dropdown arrow';
  backIcon.style.transform = 'rotate(180deg)';
  backIcon.style.height = '48px';

  backContainer.appendChild(backIcon);

  container.appendChild(backContainer);

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

  // Add form
  const form = document.createElement('form');
  form.className = 'mt-5 d-flex flex-column mx-5';
  form.name = 'updateProfile';
  form.id = 'updateProfile';
  form.addEventListener('submit', onUpdateProfile);
  
  // Add avatar field 
  const avatarField = document.createElement('div');
  avatarField.className = 'form-field mb-3';
  const avatarLabel = document.createElement('label');
  avatarLabel.className = 'form-label';
  avatarLabel.htmlFor = 'avatar';
  avatarLabel.textContent = 'Avatar URL';
  const avatarInput = document.createElement('input');
  avatarInput.className = 'form-control';
  avatarInput.type = 'url';
  avatarInput.name = 'avatar';
  avatarInput.id = 'avatar';
  avatarInput.value = profileData.avatar?.url || '';
  avatarField.appendChild(avatarLabel);
  avatarField.appendChild(avatarInput);

  // Add bio field 
  const bioField = document.createElement('div');
  bioField.className = 'form-field mb-3';
  const bioLabel = document.createElement('label');
  bioLabel.className = 'form-label';
  bioLabel.htmlFor = 'bio';
  bioLabel.textContent = 'About Me';
  const bioInput = document.createElement('input');
  bioInput.className = 'form-control';
  bioInput.style.minHeight = '10rem';
  bioInput.id = 'bio';
  bioInput.type = 'text';
  bioInput.name = 'bio';
  bioInput.value = profileData.bio || '';
  bioInput.title =
    'Write about your listings, yourself, your passion for antiques ...';
  bioInput.placeholder = 'I sell products such as ...';
  bioField.appendChild(bioLabel);
  bioField.appendChild(bioInput);
  

  // Add submit button 
  const editButton = document.createElement('button');
  editButton.id = 'editProfileButton';
  editButton.className = 'my-5 w-100 btn btn-custom-primary';
  editButton.textContent = 'Update Profile';

  form.appendChild(avatarField);
  form.appendChild(bioField);
  form.appendChild(editButton);


  container.appendChild(form);
}
