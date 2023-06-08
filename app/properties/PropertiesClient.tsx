'use client';

import React, { useCallback, useState } from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import ListingCard from '../components/listings/ListingCard';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PropertiesClientProps {
	listings: SafeListing[];
	currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
	listings,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState<String>('');

	const onDelete = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`api/listings/${id}`)
				.then(() => {
					toast.success('Listing deleted');
					router.refresh();
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error);
				})
				.finally(() => {
					setDeletingId('');
				});
		},
		[router]
	);
	return (
		<Container>
			<Heading
				title="Properties"
				subtitle="List of your Properties"
			/>
			<div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onDelete}
						disabled={deletingId === listing.id}
						actionLabel="Delete Property"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default PropertiesClient;
