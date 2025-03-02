import { getHeaders } from '../headers';
import { API_LISTINGS } from '../constants';
/**
 * Adds a bid by sending the data to the API.
 *
 * @param {Object} data - The post parameters.
 * @param {number} amount - The bidding amount (required).
 * @returns {Promise<Object>} The created post data from the API.
 * @throws {Error} If the API request fails or server returns an error.
 *
 * @example
 * const bid = {
 * amount = "1000"
 * };
 * const response = await addBid(amount);
 * console.log(response) // Outputs successfully added bid.
 *
 *
 */

export async function addBid(postId, amount) {
  if (!postId) {
    console.error('Error: No postId provided for bidding.');
    return;
  }

  const endpoint = `${API_LISTINGS}/${postId}/bids`;

  const response = await getHeaders(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      amount: amount || 0,
    }),
  });

  const bid = await response.json();

  if (response.ok) {
    alert('Bid has been added successfully.');
    window.location.replace(`/listings/?id=${postId}`);
  } else {
    console.error('Error adding a bid:', bid);
    alert('Failed to add a bid.');
  }

  return bid;
}
