import { readMultipleListings } from '../../api/listings/read';
import { renderMultipleListings } from '../../ui/post/listingTemplate';

export async function initializeHome() {
  try {
    const posts = await readMultipleListings(3, 1);
    renderMultipleListings(posts, postsContainer);
  } catch (error) {
    console.error('Error fetching multiple posts:', error);
    postsContainer.innerHTML = `<p>Failed to load posts. Please try again later or refresh the page.</p>`;
  }
}

initializeHome();
