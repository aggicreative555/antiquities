import { API_LISTINGS } from '../constants';
import { getHeaders } from '../headers';

/**
 * Creates a new post by sending the data to the API.
 *
 * @param {Object} data - The post parameters.
 * @param {string} data.title - The title of the post (required).
 * @param {string} [data.body] - The body of the post (optional).
 * @param {string[]} [data.tags] - Array of tags associated with the post (optional).
 * @param {Object} [data.media] - Media object containing URL and alt text (optional).
 * @param {string} [data.media.url] - The URL of the media (optional).
 * @param {string} [data.media.alt] - Alt text for the media (optional).
 * @returns {Promise<Object>} The created post data from the API.
 * @throws {Error} If the API request fails or server returns an error.
 *
 * @example
 * const post = {
 * title = "My post",
 * body = "short description"
 * tags = ["social", "media"],
 * media = {
 * url: "https://example.com/image.jpg",
 * alt: "Example Image" };
 * const response = await createPost(post);
 * console.log(response) // Outputs successfully created post media.
 *
 *
 */

export async function createPost(avatar, description, endsAt, title, tags) {
  const response = await getHeaders(API_LISTINGS, {
    method: 'POST',
    body: JSON.stringify({
      media: avatar?.url || null,
      description: description || '',
      endsAt: endsAt || '',
      title: title,
      tags: tags || [],
    }),
  });

  const listing = await response.json();

  if (response.ok) {
    const listingId = listing.id;
    alert('listing successfully created!');

    if (listingId) {
      window.location.replace(`/listing/?id=${listingId}`);
    }
  } else {
    console.error('Error creating post');
  }

  return listing;
}
