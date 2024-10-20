import { cn } from '@/shared/lib/utils';
import { Skeleton } from '../ui';

interface Props {
	className?: string;
}

export const BookSkeleton = ({ className }: Props) => {
	return (
		<div className={cn(className)}>
			<Skeleton className='w-full h-full' />
		</div>
	);
};
