import { readListing, readMultipleListings } from '../../api/listings/read';
import { formatDate } from '../../utilities/formatDate';

const placeholderImages = [
  'https://images.unsplash.com/photo-1552648808-d31a8783a0af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1627307284579-327ea0c7de14?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1592304502437-178c9adcf9ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586115180241-b3e4f01ed837?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export function postTemplate(postData) {
  const data = postData.data || postData;

  const col = document.createElement('div');
  col.className = 'col w-fit mx-5 justify-items-center';
  col.style.justifyItems = 'center';

  const listing = document.createElement('div');
  listing.className = 'card h-100';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'card-img-top';

  // Add media if available

  const imageUrl =
    Array.isArray(data.media) && data.media.length > 0
      ? data.media.url
      : placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

  imageContainer.style.backgroundImage = `url('${imageUrl}')`;
  imageContainer.style.minHeight = '338px';
  imageContainer.style.backgroundSize = 'cover';
  imageContainer.style.backgroundPosition = 'center';

  imageContainer.setAttribute(
    'aria-label',
    data.media?.alt || 'Post image without description',
  );

  listing.appendChild(imageContainer);

  // Add Content
  const contentContainer = document.createElement('div');
  contentContainer.className = 'card-body';
  listing.appendChild(contentContainer);

  // Add seller
  const seller = document.createElement('h3');
  seller.className = 'card-subtitle mb-3 caption';
  seller.innerHTML = `By: <span class="text-bold-S">${data.seller?.name || 'Emilia.'}</span>`;
  contentContainer.appendChild(seller);

  // Add title
  const title = document.createElement('h4');
  title.className = 'card-title heading text-center';
  title.textContent = data.title || 'An Antique Item';
  contentContainer.appendChild(title);

  // Add description
  const description = document.createElement('p');
  description.className = 'card-text mt-5  text-center';
  description.textContent =
    data.description ||
    'An antique item description, providing details of the materials, care and era.';
  contentContainer.appendChild(description);

  // Container for bids and deadline
  const containerBidDeadline = document.createElement('div');
  containerBidDeadline.className = 'card-footer';
  listing.appendChild(containerBidDeadline);

  // Add bids

  const bidCount = document.createElement('p');
  bidCount.className = 'card-text caption';
  bidCount.innerHTML = `Bids: <span class="text-bold-S">${data._count?.bids || 0}</span>`;
  containerBidDeadline.appendChild(bidCount);

  // Add deadline

  const deadLine = document.createElement('p');
  deadLine.className = 'card-text caption';
  deadLine.innerHTML = `Ends: <span class="text-bold-S">${formatDate(data.endsAt)}</span>`;
  containerBidDeadline.appendChild(deadLine);

  const viewListingButton = document.createElement('a');
  viewListingButton.className = 'btn btn-custom-secondary mt-3';
  viewListingButton.textContent = 'See full listing';
  listing.appendChild(viewListingButton);

  const line = document.createElement('span');
  line.className = 'line-2';
  listing.appendChild(line);

  viewListingButton.addEventListener('click', () => {
    const postId = data.id;

    if (postId) {
      window.location.href = `/listings/?id=${postId}`;
    }
  });

  col.appendChild(listing);
  return col;
}

/**
 * Renders a single post into a parent element.
 *
 * @function renderPostTemplate
 * @param {Object} postData - Data for the post
 * @param {HTMLElement} parent - Parent element where the post will be rendered.
 */

export function renderPostTemplate(postData) {
  const data = postData.data || postData;
  const listing = document.createElement('div');
  listing.className = 'card w-100';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'card-img-top full-screen-img';

  const imageUrl =
    Array.isArray(data.media) && data.media.length > 0
      ? data.media.url
      : placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

  imageContainer.style.backgroundImage = `url('${imageUrl}')`;
  imageContainer.setAttribute(
    'aria-label',
    data.media?.alt || 'Post image without description',
  );

  listing.appendChild(imageContainer);

  // Content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'card-body p-5';
  listing.appendChild(contentContainer);

  // Title
  const title = document.createElement('h2');
  title.className = 'card-title heading display-4';
  title.textContent = data.title || 'An Antique Item';
  contentContainer.appendChild(title);

  // Seller
  const seller = document.createElement('h3');
  seller.className = 'card-subtitle text-muted';
  seller.textContent = `By: ${data.seller?.name || 'Emilia.'}`;
  contentContainer.appendChild(seller);

  // Description
  const description = document.createElement('div');
  description.className = 'card-text fs-4';
  description.textContent =
    data.description ||
    'An antique item description, providing details of the materials, care and era.';
  contentContainer.appendChild(description);

  // Bids and deadline container
  const containerBidDeadline = document.createElement('div');
  containerBidDeadline.className =
    'card-body d-flex flex-row justify-content-between';
  listing.appendChild(containerBidDeadline);

  // Bids
  const bidCount = document.createElement('p');
  bidCount.className = 'card-text caption';
  bidCount.innerHTML = `<strong>Bids:</strong> <span class="fw-bold">${data._count.bids || '0'}</span>`;
  containerBidDeadline.appendChild(bidCount);

  // Deadline
  const deadLine = document.createElement('p');
  deadLine.className = 'card-text caption text-danger';
  deadLine.textContent = `Ends at: ${formatDate(data.endsAt)}`;
  containerBidDeadline.appendChild(deadLine);

  // Bid Now Button
  const bidNowButton = document.createElement('button');
  bidNowButton.className = 'btn btn-custom-primary btn-lg';
  bidNowButton.textContent = 'Place a Bid';
  containerBidDeadline.appendChild(bidNowButton);

  return listing;
}

export function renderMultipleListings(posts, parent) {
  parent.innerHTML = ''; // Clear previous posts

  if (Array.isArray(posts) && posts.length > 0) {
    posts.forEach((post) => {
      const postElement = postTemplate(post);
      if (postElement) {
        parent.appendChild(postElement);
      }
    });
  } else {
    console.error('No posts to render.');
    parent.innerHTML = '<p>No listings available.</p>';
  }
}

export async function renderSingleListing(postId, postsContainer) {
  try {
    const listing = await readListing(postId);
    renderPostTemplate(listing, postsContainer);
  } catch (error) {
    console.error('Error loading a single post:', error);
    postsContainer.innerHTML = `<p>Failed to load post. Please reload the page or try again later.</p>`;
  }
}

export async function initializePostsPage(postsContainer) {
  try {
    const posts = await readMultipleListings(6, 1);
    renderMultipleListings(posts, postsContainer);
  } catch (error) {
    console.error('Error fetching multiple posts:', error);
    postsContainer.innerHTML = `<p>Failed to load posts. Please try again later or refresh the page.</p>`;
  }
}
