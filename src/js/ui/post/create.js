import { createPost } from '../../api/listings/create';

/**
 * Handles the creation of a new post by submitting user input to the API.
 *
 * @async
 * @function onCreatePost
 * @param {Event} event - The form submission event.
 * @throws {Error} If post creation fails or the response does not contain a valid post ID.
 *
 */

export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const postData = Object.fromEntries(formData.entries());

  const avatar = postData.avatar
    ? { url: postData.avatar.url, alt: postData.avatar.alt || '' }
    : null;
  const description = postData.description || '';
  const title = postData.title || '';
  const tags = postData.tags
    ? postData.tags.split(',').map((tag) => tag.trim())
    : [];
  let endsAt = postData.endsAt ? new Date(postData.endsAt).toISOString() : null;

  const createButton = form.querySelector('#createLitingButton');
  // Disable the edit button to prevent multiple submissions
  createButton.disabled = true;
  createButton.textContent = 'Creating Listing...';

  try {
    const newPost = await createPost(avatar, description, endsAt, title, tags);

    if (newPost && newPost.data.id) {
      alert('Post successfully created!');
      // Redirect to the single listing view with the new post ID
      window.location.href = `/listings/?id=${newPost.data.id}`;
    } else {
      throw new Error('Post creation succeeded but no ID was returned.');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    alert('Failed to update post. Please try again.');
  } finally {
    // Re-enable the button after a short delay
    setTimeout(() => {
      createButton.disabled = false;
      createButton.textContent = 'Create Listing'; // Reset the button text
    }, 3000); // Re-enable
  }
}
