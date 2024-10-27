import { BookPage } from '@/pages/book/BookPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/books/$bookid')({
	component: () => <BookPage />,
});
