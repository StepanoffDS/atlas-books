import { Api } from '@/shared/api/api-client';
import { BookSkeleton, ItemCard } from '@/shared/components/general';
import { useQuery } from '@tanstack/react-query';

interface Props {
	className?: string;
	favorites: string[];
}

export const FavoritesListing = ({ className, favorites }: Props) => {
	const { data, isError, isLoading } = useQuery<IBook[], Error>({
		queryKey: ['favorites'],
		queryFn: () => Api.books.fetchBooksById(favorites),
	});

	return (
		<div className='items-grid mt-6'>
			{isLoading &&
				[...new Array(8)].map((_, index) => (
					<BookSkeleton key={index} className='w-full h-[425px]' />
				))}
			{isError && <div className={className}>Error</div>}
			{data && data.length === 0 && (
				<div className={className}>У вас нет избранных книг</div>
			)}
			{data &&
				data.length > 0 &&
				data.map((book) => (
					<ItemCard
						key={book.id}
						id={book.id}
						title={book.volumeInfo.title}
						thumbnailUrl={book.volumeInfo.imageLinks?.smallThumbnail}
						className='shadow-none'
					/>
				))}
		</div>
	);
};
