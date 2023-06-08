import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';

import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const propertiesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState
					title="Unauthorized"
					subtitle="Please log in"
				/>
			</ClientOnly>
		);
	}

	const listings = await getListings({
		userId: currentUser.id,
	});

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No Properties found"
					subtitle="Looks like you didn't airBnb your home yet"
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<PropertiesClient
				listings={listings}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default propertiesPage;
