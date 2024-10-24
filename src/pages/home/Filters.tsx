import React from 'react';
import { Card } from '@/shared/components/ui';
import { Sheet, SheetTrigger, SheetContent, Button } from '@/shared/components/ui';
import { FilterParams } from '@/shared/components/general';

interface Props {
	className?: string;
}

// TODO: Реализовать фильтры (понять какие вообще можно сделать)
// TODO: Передавать параметры в URL через query-string
// TODO: На мобилке будет кнопка с фильтрами

export const Filters = ({ className }: Props) => {
	return (
		<div className={'shrink-0 h-fit w-[250px] '}>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' className='md:hidden'>
						Фильтры
					</Button>
				</SheetTrigger>
				<SheetContent>
					<div className='grid gap-4 py-4'>
						<FilterParams />
					</div>
				</SheetContent>
			</Sheet>
			<Card className='hidden md:block p-3'>
				<FilterParams />
			</Card>
		</div>
	);
};
