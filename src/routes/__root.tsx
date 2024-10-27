import { Header } from '@/shared/components/general';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />
			<Outlet />
		</>
	),
});
