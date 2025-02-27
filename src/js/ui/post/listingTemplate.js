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

  const listing = document.createElement('div');
  listing.className = '';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'w-100 h-100 img-thumbnail';

  // Add media if available

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

  // Add seller
  const seller = document.createElement('h3');
  seller.className = '';
  seller.textContent = data.seller?.name || 'anonymous';
  listing.appendChild(seller);

  // Add title
  const title = document.createElement('h4');
  title.className = '';
  title.textContent = data.title || 'Untitled';
  listing.appendChild(title);

  // Add description
  const description = document.createElement('div');
  description.className = '';
  description.textContent = data.description || 'No description';
  listing.appendChild(description);

  // Add bids

  const bidCount = document.createElement('p');
  bidCount.className = '';
  bidCount.textContent = data._count.bids || '0';
  listing.appendChild(bidCount);

  // Add deadline

  const deadLine = document.createElement('p');
  deadLine.className = '';
  deadLine.textContent = `Ends at: ${formatDate(data.endsAt)}`;
  listing.appendChild(deadLine);

  const viewListingButton = document.createElement('button');
  viewListingButton.className = '';
  viewListingButton.textContent = 'See full listing';
  listing.appendChild(viewListingButton);

  viewListingButton.addEventListener('click', () => {
    const postId = data.id;

    if (postId) {
      window.location.href = `/listings/?id=${postId}`;
    }
  });

  // hoverOverlay.appendChild(hoverUsername);
  // hoverOverlay.appendChild(hoverTitle);
  // hoverOverlay.appendChild(description);
  // post.appendChild(hoverOverlay);

  // post.addEventListener("mouseenter", () => {
  //   contentOverlay.style.opacity = "0";
  //   hoverOverlay.style.opacity = "1";
  // });

  // post.addEventListener("mouseleave", () => {
  //   contentOverlay.style.opacity = "1";
  //   hoverOverlay.style.opacity = "0";
  // });

  // return post;
  return listing;
}

/**
 * Renders a single post into a parent element.
 *
 * @function renderPostTemplate
 * @param {Object} postData - Data for the post
 * @param {HTMLElement} parent - Parent element where the post will be rendered.
 */

export function renderPostTemplate(postData, parent) {
  parent.innerHTML = '';

  const data = postData.data || postData;

  const listing = document.createElement('div');
  listing.className = 'post-container';

  // Add go back function

  const backContainer = document.createElement('a');
  backContainer.className = '';
  backContainer.textContent = 'Back';
  backContainer.href = '/listings/';

  const backIcon = document.createElement('span');
  backIcon.className = '';
  backIcon.textContent = '';
  backContainer.appendChild(backIcon);

  parent.appendChild(backContainer);

  const imageContainer = document.createElement('div');
  imageContainer.className = 'w-100 h-100 img-responsive';

  // Add media if available

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

  const contentContainer = document.createElement('div');
  contentContainer.className = '';
  listing.appendChild(contentContainer);

  // Add title
  const title = document.createElement('h1');
  title.className = '';
  title.textContent = data.title || 'No title Available';

  contentContainer.appendChild(title);

  // Add seller
  const seller = document.createElement('h2');
  seller.className = '';
  seller.textContent = `${data.seller?.name || 'Anonymous'}`;
  contentContainer.appendChild(seller);

  // Add description

  const description = document.createElement('p');
  description.className = '';
  description.textContent = data.description || '';
  contentContainer.appendChild(description);

  // Add bids

  const bidCount = document.createElement('p');
  bidCount.className = '';
  bidCount.textContent = `Bids: ${data._count.bids}` || '0';
  contentContainer.appendChild(bidCount);

  // Add deadline

  const deadLine = document.createElement('p');
  deadLine.className = '';
  deadLine.textContent = `Ends at: ${formatDate(data.endsAt)}`;
  contentContainer.appendChild(deadLine);

  // Add time of creation

  const timeCreated = document.createElement('p');
  timeCreated.className = '';
  timeCreated.innerText = `Created: ${formatDate(data.created)}`;
  contentContainer.appendChild(timeCreated);

  // Add last edited

  const timeEdited = document.createElement('p');
  timeEdited.className = '';
  timeEdited.innerText = `Last Edited: ${formatDate(data.updated)}`;
  contentContainer.appendChild(timeEdited);

  // Add bid

  const bidForm = document.createElement('form');
  bidForm.id = 'bidForm';
  listing.appendChild(bidForm);

  const errorMessage = document.createElement('div');
  errorMessage.id = 'errorMessage';
  errorMessage.classList.add('error-message');
  bidForm.appendChild(errorMessage);

  const bidInput = document.createElement('input');
  bidInput.type = 'text';
  bidInput.id = 'bidInput';
  bidInput.name = 'amount';
  bidInput.required = 'true';
  bidInput.placeholder = 'NOK 1000';
  bidForm.appendChild(bidInput);

  const bidButton = document.createElement('button');
  bidButton.className = '';
  bidButton.textContent = 'Add Bid';
  bidButton.id = 'addBid';
  bidForm.appendChild(bidButton);

  // Add tags

  const tags = document.createElement('p');
  tags.className = 'tags';
  tags.innerText =
    `Tags: ${data.tags.map((tag) => `#${tag}`).join(', ')}` && '#antiques';
  contentContainer.appendChild(tags);

  parent.appendChild(listing);
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

/**
 * Initializes the posts page by rendering a single post or multiple posts based on the query parameters.
 *
 * @async
 * @function initializePostsPage
 * @throws {Error} If fetching a single post or multiple posts fails.
 *
 */

export async function initializePostsPage(postsContainer) {
  try {
    const posts = await readMultipleListings(6, 1);
    renderMultipleListings(posts, postsContainer);
  } catch (error) {
    console.error('Error fetching multiple posts:', error);
    postsContainer.innerHTML = `<p>Failed to load posts. Please try again later or refresh the page.</p>`;
  }
}
