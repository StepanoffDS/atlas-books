import { instance } from './instance';

export interface fetchBooksProps {
	query?: string;
	orderBy?: 'relevance' | 'newest';
	maxResults?: number;
	langRestrict?: string;
	pageParam?: number;
}

interface BookResponse {
	items: IBook[];
}

export const fetchBooks = async ({
	query = '',
	orderBy = 'relevance',
	maxResults = 10,
	langRestrict = '',
	pageParam = 0,
}: fetchBooksProps): Promise<IBook[]> => {
	const { data } = await instance.get<BookResponse>(
		`/volumes?q=${query}&orderBy=${orderBy}&maxResults=${maxResults}&langRestrict=${langRestrict}&startIndex=${pageParam}`
	);

	return data.items;
};
