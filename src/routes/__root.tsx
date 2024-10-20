import { Header } from '@/shared/components/general';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
