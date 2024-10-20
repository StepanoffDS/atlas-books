import { cn } from '@/shared/lib/utils';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Spinner, ItemCard, BookSkeleton } from '.';
import { useIntersectionFetch } from '@/shared/hooks';
import { fetchBooks } from '@/shared/lib';

interface Props {
	className?: string;
}

export const BookList = ({ className }: Props) => {
	const query = 'business';
	const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery<IBook[], Error>({
			queryKey: ['books'],
			queryFn: () =>
				fetchBooks({
					query: query,
				}),
			placeholderData: keepPreviousData,
			initialPageParam: 0,
			getNextPageParam: (lastPage, pages) => {
				return lastPage.length ? pages.length * 20 : undefined; // Параметр следующей страницы
			},
		});

	const intersectionRef = useIntersectionFetch(hasNextPage, fetchNextPage);

	return (
		<>
			{isLoading && (
				<div className='items-grid'>
					{[...new Array(10)].map((_, index) => (
						<BookSkeleton key={index} className='w-full h-[425px]' />
					))}
				</div>
			)}

			{isError && <div>Error</div>}

			{data && data.pages[0].length === 0 && <div>No books found</div>}

			{data && data.pages[0].length > 0 && (
				<div>
					{data?.pages.map((page, pageIndex) => (
						<div key={pageIndex} className={cn('items-grid', className)}>
							{page.map((book, index) => {
								const isLastBook = index === page.length - 1; // Определяем, последняя ли это книга
								return (
									<div key={book.id} ref={isLastBook ? intersectionRef : null}>
										<ItemCard
											title={book.volumeInfo.title}
											thumbnailUrl={book.volumeInfo.imageLinks?.smallThumbnail}
										/>
									</div>
								);
							})}
						</div>
					))}
					<div className='flex justify-center items-center'>
						{isFetchingNextPage && (
							<div>
								<Spinner />
							</div>
						)}
						{!hasNextPage && <div>No more books</div>}
					</div>
				</div>
			)}
		</>
	);
};
