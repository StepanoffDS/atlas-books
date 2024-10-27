import { Api } from '@/shared/api/api-client';
import { Layout, Spinner } from '@/shared/components/general';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { BookInfo } from './BookInfo';
import React from 'react';

export const BookPage = () => {
	const { bookid } = useParams({ from: '/books/$bookid' });

	const { data, isLoading, isError } = useQuery({
		queryKey: ['book', bookid],
		queryFn: () => Api.books.fetchBookById(bookid),
	});

	React.useEffect(() => {
		document.title = data?.volumeInfo.title || 'Книга';
	}, [data]);

	return (
		<Layout>
			{isLoading && (
				<div className='absolute top-0 left-0 overflow-hidden w-full h-full flex items-center justify-center'>
					<Spinner />
				</div>
			)}
			{isError && <div>Ошибка</div>}
			{data && <BookInfo id={bookid} data={data} />}
		</Layout>
	);
};
