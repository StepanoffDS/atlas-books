import { Api } from '@/shared/api/api-client';
import { ItemCard, Layout } from '@/shared/components/general';
import { Checkbox, Input } from '@/shared/components/ui';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'react-use';
import React from 'react';

interface Props {
	className?: string;
}

const fetchData = async ({ query = '', langRestrict = '' }) => {
	try {
		return Api.books.fetchBooks({ query: query, langRestrict: langRestrict });
	} catch (error) {
		console.error('Search ERROR: ', error);
		throw error;
	}
};

export const SearchPage = ({ className }: Props) => {
	const [russianOnly, setRussianOnly] = React.useState<boolean>(false);
	const [query, setQuery] = React.useState<string>('');
	const [debouncedValue, setDebouncedValue] = React.useState<string>(query);
	const { data, isLoading, isError } = useQuery<IBook[] | undefined>({
		queryKey: ['books', debouncedValue, russianOnly],
		queryFn: () =>
			fetchData({ query: debouncedValue, langRestrict: russianOnly ? 'ru' : '' }),
		placeholderData: keepPreviousData,
	});

	useDebounce(
		async () => {
			setDebouncedValue(query);
		},
		500,
		[query]
	);

	return (
		<div className={className}>
			<Layout>
				{isLoading && <div className='text-center text-gray-500'>Загрузка...</div>}
				{isError && <div className='text-center text-gray-500'>Error</div>}

				<div className='flex flex-col items-center'>
					<Input
						className='max-w-2xl h-11'
						placeholder='Начните писать... '
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<div className='flex items-center gap-2 mt-2'>
						<Checkbox
							id='only-russian'
							checked={russianOnly}
							onCheckedChange={() => setRussianOnly(!russianOnly)}
						/>
						<label htmlFor='only-russian'>Книги только на русском</label>
					</div>
				</div>
				<div className='mt-12'>
					{!data && (
						<div className='text-center text-gray-500'>
							Введите в поиск название книги, которую хотите найти
						</div>
					)}
					{data?.length === 0 && (
						<div className='text-center text-gray-500'>
							По запросу "{query}" ничего не найдено
						</div>
					)}
					{data && data.length > 0 && (
						<div className='items-grid'>
							{data.map((book) => {
								const thumbnailUrl =
									book.volumeInfo.imageLinks?.thumbnail ||
									book.volumeInfo.imageLinks?.smallThumbnail;
								return (
									<ItemCard
										key={book.id}
										title={book.volumeInfo.title}
										thumbnailUrl={thumbnailUrl}
									/>
								);
							})}
						</div>
					)}
				</div>
			</Layout>
		</div>
	);
};
