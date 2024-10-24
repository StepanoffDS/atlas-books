import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useDebounce } from 'react-use';
import { useFilterStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';
import { Checkbox } from '../ui';

interface Props {
	className?: string;
}
// TODO: Сделать параметры printType, orderBy,filter
export const FilterParams = ({ className }: Props) => {
	const isMounted = React.useRef(false);
	const [isRus, setIsRus] = React.useState<boolean>(false);

	const { onlyRussian, setOnlyRussian } = useFilterStore(
		useShallow((state) => ({
			onlyRussian: state.onlyRussian,
			setOnlyRussian: state.setOnlyRussian,
		}))
	);

	useDebounce(
		async () => {
			if (isMounted.current) {
				setOnlyRussian(isRus);
			}

			isMounted.current = true;
		},
		500,
		[isRus]
	);

	return (
		<div className={cn('flex items-center gap-2 select-none', className)}>
			<Checkbox
				id='only-russian'
				checked={isRus}
				onCheckedChange={() => setIsRus(!isRus)}
			/>
			<label htmlFor='only-russian' className='cursor-pointer'>
				Книги только на русском
			</label>
		</div>
	);
};
