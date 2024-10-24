import { Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { useFilterStore } from '@/shared/store';
import { X } from 'lucide-react';
import React from 'react';
import { useDebounce } from 'react-use';

interface Props {
	className?: string;
}

export const Search = ({ className }: Props) => {
	const isMounted = React.useRef(false);
	const [query, setQuery] = React.useState<string>('');
	const setSearchValue = useFilterStore((state) => state.setSearchValue);

	const handleClearInput = React.useCallback(() => {
		setQuery('');
		setSearchValue('');
	}, [setSearchValue]);

	useDebounce(
		async () => {
			if (isMounted.current) setSearchValue(query);

			isMounted.current = true;
		},
		250,
		[query]
	);

	return (
		<div className={cn('relative flex-1 max-w-xs w-full', className)}>
			<Input
				className='max-w-2xl h-11'
				placeholder='Поиск... '
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			{query && (
				<button
					className='absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer transition'
					onClick={handleClearInput}
				>
					<X color='currentColor' />
				</button>
			)}
		</div>
	);
};
