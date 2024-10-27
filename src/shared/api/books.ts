import { instance } from './instance';

export interface fetchBooksProps {
	query?: string;
	orderBy?: TOrderBy;
	maxResults?: number;
	langRestrict?: TLang;
	pageParam?: number;
	filter?: TFilter;
	printType?: TPrintType;
	download?: TDownload;
}

interface BookResponse {
	totalItems: number;
	items: IBook[];
}

export const fetchBooks = async ({
	query = '',
	orderBy = 'relevance',
	maxResults = 12,
	langRestrict = '',
	pageParam = 0,
	filter = 'ebooks',
	printType = 'all',
	download = '',
}: fetchBooksProps): Promise<IBook[] | []> => {
	try {
		const downloadParam = download ? `&download=${download}` : '';
		const langParam = langRestrict ? `&langRestrict=${langRestrict}` : '';

		const string = `/volumes?q=${query}&orderBy=${orderBy}&maxResults=${maxResults}${langParam}&startIndex=${pageParam}&projection=lite&filter=${filter}&printType=${printType}${downloadParam}`;

		const { data } = await instance.get<BookResponse>(string);

		if (data.totalItems === 0) return [];

		return data.items;
	} catch (error) {
		console.error('Books fetch ERROR: ', error);
		return [];
	}
};

export const fetchBooksById = async (favorites: string[]) => {
	try {
		const promises = favorites.map((id) => instance.get(`/volumes/${id}`));

		// Ожидаем завершения всех запросов
		const responses = await Promise.all(promises);
		const booksData = responses.map((response) => response.data);

		return booksData;
	} catch (err) {
		console.error('Error fetching books by id:', err);
		return [];
	}
};

export const fetchBookById = async (id: string) => {
	try {
		const response = await instance.get(`/volumes/${id}`);
		return response.data;
	} catch (error) {
		console.log('Error fetching book by id:', error);
	}
};
