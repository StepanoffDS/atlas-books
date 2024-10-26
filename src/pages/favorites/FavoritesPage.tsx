import { Layout, Title } from '@/shared/components/general';
import { useFavoritesStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';
import { FavoritesListing } from './FavoritesListing';

export const FavoritesPage = () => {
	const { favorites, totalAmount } = useFavoritesStore(
		useShallow((state) => ({
			favorites: state.favorites,
			totalAmount: state.totalAmount,
		}))
	);

	return (
		<div>
			<Layout>
				<Title text={`Избранное (${totalAmount})`} size='lg' className='font-medium' />
				<FavoritesListing favorites={favorites} />
			</Layout>
		</div>
	);
};
