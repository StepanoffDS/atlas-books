import { Card } from '@/shared/components/ui';
import { Sheet, SheetTrigger, SheetContent, Button } from '@/shared/components/ui';
import { FilterParams } from '@/shared/components/general';
import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
}

export const Filters = ({ className }: Props) => {
	return (
		<div className={cn('shrink-0 h-fit w-[250px] sticky top-2', className)}>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' className='md:hidden'>
						Фильтры
					</Button>
				</SheetTrigger>
				<SheetContent side={'left'}>
					<div className='grid gap-4 py-4'>
						<FilterParams id='sheet' />
					</div>
				</SheetContent>
			</Sheet>
			<Card className='hidden md:block p-3'>
				<FilterParams id='card' />
			</Card>
		</div>
	);
};
