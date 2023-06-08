import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';

import getFavoritesListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

const favoritesPage = async () => {
	const listings = await getFavoritesListings();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No Favorites found"
					subtitle="Looks like you didn't set any listing as favorite"
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<FavoritesClient
				listings={listings}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default favoritesPage;
