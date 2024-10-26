import { cn } from '@/shared/lib/utils';

interface Props {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
}

export const Layout = ({ children, className }: Props) => {
	return (
		<>
			<main className={cn('layout', className)}>{children}</main>
		</>
	);
};
