import { cn } from '@/shared/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner, ItemCard, BookSkeleton } from '.';
import { useIntersectionFetch } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';
import { Api } from '@/shared/api/api-client';
import React from 'react';

interface Props {
	className?: string;
}

export const BookList = ({ className }: Props) => {
	// Получаем данные для запроса на сервер
	const { query, onlyRussian, onlyDownload, filterType, ordering, printing } =
		useFilterStore(
			useShallow((state) => ({
				query: state.searchValue,
				onlyRussian: state.onlyRussian,
				onlyDownload: state.onlyDownload,
				filterType: state.filterType,
				ordering: state.ordering,
				printing: state.printing,
			}))
		);

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [query, onlyRussian, onlyDownload, filterType, ordering, printing]);

	// Здесь происходит запрос на сервер
	const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery<IBook[], Error>({
			queryKey: [
				'books',
				query,
				onlyRussian,
				onlyDownload,
				filterType,
				ordering,
				printing,
			],
			queryFn: () =>
				Api.books.fetchBooks({
					query: query,
					langRestrict: onlyRussian ? 'ru' : '',
					download: onlyDownload ? 'epub' : '',
					filter: filterType,
					orderBy: ordering,
					printType: printing,
				}),
			initialPageParam: 0,
			getNextPageParam: (lastPage, pages) => {
				return lastPage.length ? pages.length * 20 : undefined; // Параметр следующей страницы
			},
		});

	const intersectionRef = useIntersectionFetch(hasNextPage, fetchNextPage);

	return (
		<>
			{!query && (
				<div className={'flex justify-center items-center h-full'}>
					Введите название книги
				</div>
			)}

			{isLoading && (
				<div className={cn('items-grid', className)}>
					{[...new Array(10)].map((_, index) => (
						<BookSkeleton key={index} className='w-full h-[425px]' />
					))}
				</div>
			)}

			{isError && <div className={className}>Error</div>}

			{data && data.pages[0].length === 0 && query && (
				<div className={className}>По вашему запросу не найдено ни одной книги</div>
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
											id={book.id}
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
						{!hasNextPage && <div>Больше книг нет</div>}
					</div>
				</div>
			)}
		</>
	);
};
