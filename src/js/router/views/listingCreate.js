import { authGuard } from '../../utilities/authGuard';
import { onCreatePost } from '../../ui/post/create';
import { createListingTemplate } from '../../ui/post/createListingTemplate';

async function initializePostCreate() {
  authGuard();

  const createListingContainer = document.querySelector(
    '#createListingContainer',
  );

  if (!createListingContainer) {
    console.error('Container not found.');
    return;
  }

  createListingTemplate(createListingContainer);

  const form = document.querySelector('#createPost');

  if (form) {
    form.addEventListener('submit', onCreatePost);
  } else {
    console.error('Create Post Form element not found.');
  }
}

initializePostCreate();
