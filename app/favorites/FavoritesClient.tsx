'use client';

import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface FavoritesClientProps {
	listings: SafeListing[];
	currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
	listings,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState<String>('');

	return (
		<Container>
			<Heading
				title="Favorites"
				subtitle="Your Favorites listings"
			/>
			<div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default FavoritesClient;
