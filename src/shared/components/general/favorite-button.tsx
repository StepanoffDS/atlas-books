import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { Button } from '../ui';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useFavoritesStore } from '@/shared/store';

interface Props {
	id: string;
	className?: string;
}

export const FavoriteButton = ({ id, className }: Props) => {
	const { favorites, toggleFavorite } = useFavoritesStore(
		useShallow((state) => ({
			favorites: state.favorites,
			totalAmount: state.totalAmount,
			toggleFavorite: state.toggleFavorite,
		}))
	);
	const isFavorite = React.useMemo(() => favorites.includes(id), [favorites, id]);

	return (
		<Button className={className} onClick={() => toggleFavorite(id)}>
			{isFavorite ? <StarFilledIcon /> : <StarIcon />}
		</Button>
	);
};
