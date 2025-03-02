export function createListingTemplate(parent) {
  if (!parent) {
    console.error('Parent container not found for createListingTemplate.');
    return;
  }

  parent.innerHTML = '';


  const form = document.createElement('form');
  form.className = 'd-flex flex-column gap-5 w-full';
  form.name = 'createPost';
  form.id = 'createPost';

  // Placeholder image container
  const placeholderContainer = document.createElement('div');
  placeholderContainer.className = 'placeholder-container my-3';

  const placeholderImage = document.createElement('img');
  placeholderImage.src = '/images/placeholder-image-camera.jpg'; 
  placeholderImage.alt = 'Placeholder Image';
  placeholderImage.className = 'img-fluid border-black'; 

  placeholderContainer.appendChild(placeholderImage);
  form.appendChild(placeholderContainer);
 

  // Image URL field
  const imageDiv = document.createElement('div');
  imageDiv.className = 'form-field';
  const urlLabel = document.createElement('label');
  urlLabel.className = 'form-label capitalize';
  urlLabel.htmlFor = 'url';
  urlLabel.textContent = 'Add image URL';
  const urlInput = document.createElement('input');
  urlInput.className = 'form-control mb-4';
  urlInput.type = 'url';
  urlInput.name = 'url';
  urlInput.placeholder = 'url';

  const altLabel = document.createElement('label');
  altLabel.className = 'form-label capitalize';
  altLabel.htmlFor = 'alt';
  altLabel.textContent = 'Add image alt text';
  const altInput = document.createElement('input');
  altInput.className = 'form-control';
  altInput.type = 'text';
  altInput.name = 'alt';
  altInput.placeholder = 'alt';

  imageDiv.appendChild(urlLabel);
  imageDiv.appendChild(urlInput);
  imageDiv.appendChild(altLabel);
  imageDiv.appendChild(altInput);

  form.appendChild(imageDiv); 

  // Title field
  const titleField = document.createElement('div');
  titleField.className = 'form-field';
  const titleLabel = document.createElement('label');
  titleLabel.className = 'form-label capitalize';
  titleLabel.htmlFor = 'title';
  titleLabel.textContent = 'Post Title';
  const titleInput = document.createElement('input');
  titleInput.className = 'form-control';
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.required = true;
  titleInput.placeholder = 'Title';

  titleField.appendChild(titleLabel);
  titleField.appendChild(titleInput);

  form.appendChild(titleField); 

  // Content field
  const contentField = document.createElement('div');
  contentField.className = 'form-field';
  const contentLabel = document.createElement('label');
  contentLabel.className = 'form-label capitalize';
  contentLabel.htmlFor = 'content';
  contentLabel.textContent = 'Content';
  const contentTextarea = document.createElement('textarea');
  contentTextarea.className = 'form-control';
  contentTextarea.name = 'content';
  contentTextarea.placeholder = 'Content';
  contentTextarea.cols = 30;
  contentTextarea.rows = 10;

  contentField.appendChild(contentLabel);
  contentField.appendChild(contentTextarea);

  form.appendChild(contentField); 

  // Tags field
  const tagsField = document.createElement('div');
  tagsField.className = 'form-field';
  const tagsLabel = document.createElement('label');
  tagsLabel.className = 'form-label capitalize';
  tagsLabel.htmlFor = 'tags';
  tagsLabel.textContent = 'Add tags';
  const tagsInput = document.createElement('input');
  tagsInput.className = 'form-control';
  tagsInput.type = 'text';
  tagsInput.name = 'tags';
  tagsInput.placeholder = 'tag 1, tag 2';

  tagsField.appendChild(tagsLabel);
  tagsField.appendChild(tagsInput);

  form.appendChild(tagsField); 

  // Listing deadline field
  const deadlineField = document.createElement('div');
  deadlineField.className = 'form-field';
  const deadlineLabel = document.createElement('label');
  deadlineLabel.className = 'form-label capitalize';
  deadlineLabel.htmlFor = 'endsAt';
  deadlineLabel.textContent = 'Listing Deadline';
  const deadlineInput = document.createElement('input');
  deadlineInput.className = 'form-control';
  deadlineInput.type = 'date';
  deadlineInput.required = true;
  deadlineInput.name = 'endsAt';

  deadlineField.appendChild(deadlineLabel);
  deadlineField.appendChild(deadlineInput);

  form.appendChild(deadlineField); 

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.id = 'createListingButton';
  submitButton.className = 'my-3 w-100 btn btn-custom-primary';
  submitButton.textContent = 'Create Post';

  form.appendChild(submitButton); 

  parent.appendChild(form);
}