import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './shared/components/ui';

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById('root')!).render(
	<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</ThemeProvider>
);
