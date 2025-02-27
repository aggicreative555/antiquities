export function createListingTemplate(parent) {
  if (!parent) {
    console.error('Parent container not found for createListingTemplate.');
    return;
  }

  parent.innerHTML = '';

  const form = document.createElement('form');
  form.name = 'createPost';
  form.id = 'createPost';

  // Image URL field
  const imageDiv = document.createElement('div');
  const urlLabel = document.createElement('label');
  urlLabel.htmlFor = 'url';
  urlLabel.textContent = 'Add image URL';
  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.name = 'url';
  urlInput.placeholder = 'url';

  const altLabel = document.createElement('label');
  altLabel.htmlFor = 'alt';
  altLabel.textContent = 'Add image alt text';
  const altInput = document.createElement('input');
  altInput.type = 'text';
  altInput.name = 'alt';
  altInput.placeholder = 'alt';

  imageDiv.appendChild(urlLabel);
  imageDiv.appendChild(urlInput);
  imageDiv.appendChild(altLabel);
  imageDiv.appendChild(altInput);

  // Title field
  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'title';
  titleLabel.textContent = 'Post Title';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.required = 'true';
  titleInput.placeholder = 'Title';

  // Content field
  const contentLabel = document.createElement('label');
  contentLabel.htmlFor = 'content';
  contentLabel.textContent = 'Content';
  const contentTextarea = document.createElement('textarea');
  contentTextarea.name = 'content';
  contentTextarea.placeholder = 'Content';
  contentTextarea.cols = 30;
  contentTextarea.rows = 10;

  // Tags field
  const tagsLabel = document.createElement('label');
  tagsLabel.htmlFor = 'tags';
  tagsLabel.textContent = 'Add tags';
  const tagsInput = document.createElement('input');
  tagsInput.type = 'text';
  tagsInput.name = 'tags';
  tagsInput.placeholder = 'tag 1, tag 2';

  // Listing deadline field
  const deadlineLabel = document.createElement('label');
  deadlineLabel.htmlFor = 'endsAt';
  deadlineLabel.textContent = 'Listing Deadline';
  const deadlineInput = document.createElement('input');
  deadlineInput.type = 'date';
  deadlineInput.required = 'true';
  deadlineInput.name = 'endsAt';

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.id = 'createLitingButton';
  submitButton.textContent = 'Create Post';

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(contentLabel);
  form.appendChild(contentTextarea);
  form.appendChild(imageDiv);
  form.appendChild(tagsLabel);
  form.appendChild(tagsInput);
  form.appendChild(deadlineLabel);
  form.appendChild(deadlineInput);
  form.appendChild(submitButton);

  parent.appendChild(form);
}
