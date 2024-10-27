import React from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui';
import { BookCover } from './book-cover';
import { cn } from '@/shared/lib/utils';
import { Link } from '@tanstack/react-router';
import { FavoriteButton } from './favorite-button';

interface Props {
	className?: string;
	title: string;
	thumbnailUrl?: string;
	id: string;
}

export const ItemCard = React.memo(({ className, title, thumbnailUrl, id }: Props) => {
	return (
		<Card className={cn('flex flex-col h-full dark:back', className)}>
			<Link to={`/books/${id}`}>
				<CardContent className='p-3 pb-0'>
					<div className='item-img'>
						{thumbnailUrl ? (
							<img src={thumbnailUrl} alt={title} className='w-full ' />
						) : (
							<BookCover title={title} />
						)}
					</div>
				</CardContent>
			</Link>
			<CardHeader className='p-3'>
				<CardTitle className='line-clamp-2'>{title}</CardTitle>
			</CardHeader>
			<CardFooter className='mt-auto p-3 flex gap-2'>
				<Link to={`/books/${id}`} className='flex-1'>
					<Button className='w-full'>Подробнее</Button>
				</Link>
				<FavoriteButton id={id} />
			</CardFooter>
		</Card>
	);
});
