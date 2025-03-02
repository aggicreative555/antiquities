import { load } from '../../utilities/authGuard';
import { API_AUCTION_PROFILES } from '../constants';
import { getHeaders } from '../headers';

export async function updateProfile({ bio, avatar }) {
  const storedUser = load('user');

  if (!storedUser) {
    throw new Error('User must be logged in for updating');
  }

  const response = await getHeaders(
    `${API_AUCTION_PROFILES}/${storedUser.name}`,
    {
      method: 'PUT',
      body: JSON.stringify({ bio, avatar }),
    },
  );

  const updateProfile = await response.json();

  return updateProfile;
}
