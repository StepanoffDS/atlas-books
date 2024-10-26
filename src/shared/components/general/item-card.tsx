import React from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui';
import { BookCover } from './book-cover';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { cn } from '@/shared/lib/utils';
import { useFavoritesStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';

interface Props {
	className?: string;
	title: string;
	thumbnailUrl?: string;
	id: string;
}

export const ItemCard = React.memo(({ className, title, thumbnailUrl, id }: Props) => {
	const { favorites, toggleFavorite } = useFavoritesStore(
		useShallow((state) => ({
			favorites: state.favorites,
			totalAmount: state.totalAmount,
			toggleFavorite: state.toggleFavorite,
		}))
	);

	const isFavorite = React.useMemo(() => favorites.includes(id), [favorites, id]);

	return (
		<Card className={cn('flex flex-col h-full', className)}>
			<CardContent className='p-3 pb-0'>
				<div className='item-img'>
					{thumbnailUrl ? (
						<img src={thumbnailUrl} alt={title} className='w-full ' />
					) : (
						<BookCover title={title} />
					)}
				</div>
			</CardContent>
			<CardHeader className='p-3'>
				<CardTitle className='line-clamp-2'>{title}</CardTitle>
			</CardHeader>
			<CardFooter className='mt-auto p-3 flex gap-2'>
				<Button className='flex-1'>More info</Button>
				<Button onClick={() => toggleFavorite(id)}>
					{isFavorite ? <StarFilledIcon /> : <StarIcon />}
				</Button>
			</CardFooter>
		</Card>
	);
});
