import {
  renderSingleListing,
  initializePostsPage,
} from '../../ui/post/listingTemplate';

import { onAddBid } from '../../ui/post/bid';
import { validateBidInput } from '../../ui/global/validateBidInput';

export async function initializePostFunctions() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const postsContainer = document.querySelector('#postsContainer');

    if (!postId) {
      await initializePostsPage(postsContainer);
    } else {
      const multiplePostsContent = document.getElementById(
        'mutiplePostsContent',
      );
      const postsContainer = document.getElementById('postsContainer');

      multiplePostsContent.classList.remove('block');
      multiplePostsContent.classList.add('hidden');

      postsContainer.classList.replace('posts-container', 'single-post');

      await renderSingleListing(postId, postsContainer);

      // Add bid
      const bidInput = document.getElementById('bidInput');
      const bidForm = document.querySelector('#bidForm');

      if (bidInput) {
        if (!bidInput.value.includes('NOK')) {
          bidInput.value = 'NOK ';
        }

        bidInput.addEventListener('input', validateBidInput);
      }

      if (bidForm) {
        bidForm.addEventListener('submit', onAddBid);
      }
    }
  } catch (error) {
    console.error('Error initializing post page.', error);
  }
}

initializePostFunctions();
