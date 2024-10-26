import { FavoritesPage } from '@/pages';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/favorites')({
	component: () => <FavoritesPage />,
});
