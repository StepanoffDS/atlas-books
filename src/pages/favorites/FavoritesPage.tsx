import { Layout, Title } from '@/shared/components/general';
import { useFavoritesStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';
import { FavoritesListing } from './FavoritesListing';
import React from 'react';

export const FavoritesPage = () => {
	const { favorites, totalAmount } = useFavoritesStore(
		useShallow((state) => ({
			favorites: state.favorites,
			totalAmount: state.totalAmount,
		}))
	);

	React.useEffect(() => {
		document.title = 'Atlas - Избранное';
	}, []);

	return (
		<div>
			<Layout>
				<Title text={`Избранное (${totalAmount})`} size='lg' className='font-medium' />
				<FavoritesListing favorites={favorites} />
			</Layout>
		</div>
	);
};
