import { SearchPage } from '@/pages';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/search')({
	component: () => <SearchPage />,
});
