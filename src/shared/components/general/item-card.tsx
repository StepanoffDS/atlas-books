import React from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui';
import { BookCover } from './book-cover';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
	title: string;
	thumbnailUrl?: string;
}

export const ItemCard = React.memo(({ className, title, thumbnailUrl }: Props) => {
	const [isFavorite, setIsFavorite] = React.useState(false);

	const handleToggleFavorite = React.useCallback(() => {
		setIsFavorite(!isFavorite);
	}, [isFavorite]);

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
				<Button onClick={handleToggleFavorite}>
					{isFavorite ? <StarFilledIcon /> : <StarIcon />}
				</Button>
			</CardFooter>
		</Card>
	);
});
