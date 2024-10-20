import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
	title: string;
}

export const BookCover = ({ className, title }: Props) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center aspect-[3/4] bg-slate-500 text-white p-4 text-2xl',
				className
			)}
		>
			{title}
		</div>
	);
};
