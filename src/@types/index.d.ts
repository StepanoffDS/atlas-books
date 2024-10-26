declare global {
	export interface IBook {
		kind: string;
		id: string;
		etag: string;
		selfLink: string;
		volumeInfo: VolumeInfo;
		saleInfo: SaleInfo;
		accessInfo: AccessInfo;
		searchInfo: SearchInfo;
	}

	export type TFilter = 'ebooks' | 'free-ebooks' | 'paid-ebooks' | 'full' | 'partial';

	export type TOrderBy = 'relevance' | 'newest';

	export type TPrintType = 'all' | 'books' | 'magazines';

	export type TDownload = '' | 'epub';

	export type TLang = '' | 'ru';
}

export interface VolumeInfo {
	title: string;
	subtitle: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	industryIdentifiers: IndustryIdentifier[];
	readingModes: ReadingModes;
	pageCount: number;
	printType: string;
	categories: string[];
	maturityRating: string;
	allowAnonLogging: boolean;
	contentVersion: string;
	panelizationSummary: PanelizationSummary;
	imageLinks: ImageLinks;
	language: string;
	previewLink: string;
	infoLink: string;
	canonicalVolumeLink: string;
}

export interface IndustryIdentifier {
	type: string;
	identifier: string;
}

export interface ReadingModes {
	text: boolean;
	image: boolean;
}

export interface PanelizationSummary {
	containsEpubBubbles: boolean;
	containsImageBubbles: boolean;
}

export interface ImageLinks {
	smallThumbnail: string;
	thumbnail?: string;
}

export interface SaleInfo {
	country: string;
	saleability: string;
	isEbook: boolean;
}

export interface AccessInfo {
	country: string;
	viewability: string;
	embeddable: boolean;
	publicDomain: boolean;
	textToSpeechPermission: string;
	epub: Epub;
	pdf: Pdf;
	webReaderLink: string;
	accessViewStatus: string;
	quoteSharingAllowed: boolean;
}

export interface Epub {
	isAvailable: boolean;
}

export interface Pdf {
	isAvailable: boolean;
}

export interface SearchInfo {
	textSnippet: string;
}
