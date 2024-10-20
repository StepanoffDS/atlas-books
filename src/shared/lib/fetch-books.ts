import { Api } from '../api/api-client';
import { fetchBooksProps } from '../api/books';

export const fetchBooks = async ({
	query = 'business',
	pageParam = 0,
	orderBy,
	maxResults,
	langRestrict,
}: fetchBooksProps): Promise<IBook[]> => {
	try {
		const data = await Api.books.fetchBooks({
			query,
			pageParam,
			orderBy,
			maxResults,
			langRestrict,
		});

		return data;
	} catch (error) {
		console.error('Books fetch ERROR: ', error);
		return [];
	}
};
