import { cn } from '@/shared/lib/utils';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Spinner, ItemCard, BookSkeleton } from '.';
import { useIntersectionFetch } from '@/shared/hooks';
import { fetchBooks } from '@/shared/lib';
import { useFilterStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';

interface Props {
	className?: string;
}

export const BookList = ({ className }: Props) => {
	const { query, onlyRussian } = useFilterStore(
		useShallow((state) => ({
			query: state.searchValue,
			onlyRussian: state.onlyRussian,
		}))
	);
	const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery<IBook[], Error>({
			queryKey: ['books', query, onlyRussian],
			queryFn: () =>
				fetchBooks({
					query: query,
					langRestrict: onlyRussian ? 'ru' : 'en',
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
				<div className={cn('items-grid', className)}>
					{[...new Array(10)].map((_, index) => (
						<BookSkeleton key={index} className='w-full h-[425px]' />
					))}
				</div>
			)}

			{isError && <div className={className}>Error</div>}

			{data && data.pages[0].length === 0 && (
				<div className={className}>No books found</div>
			)}

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
											className='shadow-none'
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
