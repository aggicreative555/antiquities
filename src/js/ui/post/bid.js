import { addBid } from '../../api/listings/bid';
import { validateBidInput } from '../global/validateBidInput';

export async function onAddBid(event) {
  event.preventDefault();

  const form = document.getElementById('bidForm');
  const errorMessage = document.getElementById('errorMessage');

  const formData = new FormData(form);
  const postData = Object.fromEntries(formData.entries());

  const amount = parseInt(postData.amount.replace(/[^0-9]/g, ''), 10) || 0;

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    alert('Error: Listing ID not found.');
    return;
  }

  if (isNaN(amount)) {
    errorMessage.textContent = 'Please enter a valid number.';
    return;
  }

  if (amount < 250 || amount > 100000) {
    errorMessage.textContent =
      'Please enter a bid amount between NOK 250 - NOK 100 000';
    return;
  }

  const addBidButton = form.querySelector('#addBid');
  // Disable the button to prevent multiple submissions
  addBidButton.disabled = true;
  addBidButton.textContent = 'Submitting Bid...';

  try {
    const newBid = await addBid(postId, amount);

    if (newBid.data) {
      alert('Bid has been added successfully');
      // Reload page, updating API information
      window.location.reload();
    } else {
      alert('Bid cannot be placed. Try again later.');
      window.location.reload();
    }
  } catch (error) {
    console.error('Error adding bid:', error);
    alert('Failed to add bid. Try again later or reload the page.');
  } finally {
    // Re-enable the button after a short delay
    setTimeout(() => {
      addBidButton.disabled = false;
      addBidButton.textContent = 'Add Bid'; // Reset the button text
    }, 3000); // Re-enable
  }
}
