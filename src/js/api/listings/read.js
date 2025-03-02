import { getHeaders } from '../headers';
import { API_LISTINGS } from '../constants';

/**
 * Reads a single Listing by its ID.
 *
 * @async
 * @function readListing
 * @param {string|number} id - The ID of the Listing to read.
 * @returns {Promise<object>} The response data.
 * @throws {Error} If the API request fails or the id is absent.
 *
 * @example
 * const Listing = await readListing(123);
 * console.log(Listing) // Outputs specific id Listing data.
 */

export async function readListing(id) {
  if (!id) {
    throw new Error('Listing ID is required.');
  }

  const response = await getHeaders(`${API_LISTINGS}/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(
      `Failed to read Listing with ID ${id}: ${response.statusText}`,
    );
  }

  const readListing = await response.json();
  return readListing;
}

/**
 * Reads multiple Listings with optional pagination and tagging.
 *
 * @async
 * @function readMultipleListings
 * @param {number} [limit=12] - The maximum number of Listings to return.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter Listings.
 * @returns {Promise<Object>} An object containing an array of Listings in the `data` field, and information in a `meta` field.
 * @throws {Error} If the API request fails.
 *
 * @example
 * const { data, meta } = await readMultipleListings(10, 2, "tech");
 * console.log(data); // Outputs an array of Listings tagged "tech".
 * console.log(meta); // Outputs pagination metadata.
 */

export async function readMultipleListings(limit = 6, page = 1, tag = '') {
  try {
    let apiUrl = `${API_LISTINGS}?limit=${limit}&page=${page}`;
    if (tag) apiUrl += `&tag=${encodeURIComponent(tag)}`;

    const response = await getHeaders(apiUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Listings: ${response.statusText}`);
    }

    let multipleListings = await response.json();

    const listingsArray = Array.isArray(multipleListings.data)
      ? multipleListings.data
      : [];

    const sortedListings = listingsArray.sort(
      (a, b) => new Date(b.created) - new Date(a.created),
    );

    return sortedListings;
  } catch (error) {
    console.error('Failed to retrieve Listings.');
    throw error;
  }
}
