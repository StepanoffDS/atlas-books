import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/books/')({
	component: () => {
		const Component = () => {
			const navigate = useNavigate();

			navigate({ to: '/' });

			return null;
		};
		return <Component />;
	},
});
