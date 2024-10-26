import { cn } from '@/shared/lib/utils';
import { useFilterStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';
import {
	Checkbox,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui';

interface Props {
	className?: string;
	id: 'card' | 'sheet';
}
export const FilterParams = ({ className, id }: Props) => {
	// Беру actions для передачи значений фильтра
	const {
		onlyRussian,
		setOnlyRussian,
		onlyDownload,
		setOnlyDownload,
		filterType,
		setFilterType,
		ordering,
		setOrdering,
		printing,
		setPrinting,
	} = useFilterStore(
		useShallow((state) => ({
			onlyRussian: state.onlyRussian,
			setOnlyRussian: state.setOnlyRussian,
			onlyDownload: state.onlyDownload,
			setOnlyDownload: state.setOnlyDownload,
			filterType: state.filterType,
			setFilterType: state.setFilterType,
			ordering: state.ordering,
			setOrdering: state.setOrdering,
			printing: state.printing,
			setPrinting: state.setPrinting,
		}))
	);

	return (
		<div className={cn('flex flex-col gap-3', className)}>
			{/* Russian Only */}
			<div className={'flex items-center gap-2 select-none'}>
				<Checkbox
					id={`only-russian-${id}`}
					checked={onlyRussian}
					onCheckedChange={() => setOnlyRussian(!onlyRussian)}
				/>
				<label htmlFor={`only-russian-${id}`} className='cursor-pointer'>
					Книги только на русском
				</label>
			</div>
			{/* Download */}
			<div className={cn('flex items-center gap-2 select-none', className)}>
				<Checkbox
					id={`only-download-${id}`}
					checked={onlyDownload}
					onCheckedChange={() => setOnlyDownload(!onlyDownload)}
				/>
				<label htmlFor={`only-download-${id}`} className='cursor-pointer'>
					Книги можно скачать
				</label>
			</div>
			{/* Filter */}
			<div>
				<Select
					defaultValue={filterType}
					onValueChange={(value: TFilter) => setFilterType(value)}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Выбрать фильтр' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='ebooks'>Все книги</SelectItem>
							<SelectItem value='free-ebooks'>Бесплатные</SelectItem>
							<SelectItem value='paid-ebooks'>Платные</SelectItem>
							<SelectItem value='full'>Полная видимость</SelectItem>
							<SelectItem value='partial'>Частичная видимость</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{/* OrderBy */}
			<div>
				<Select
					defaultValue={ordering}
					onValueChange={(value: TOrderBy) => setOrdering(value)}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Выбрать сортировку' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='relevance'>Сначала актуальные</SelectItem>
							<SelectItem value='newest'>Сначала новые</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{/* PrintType */}
			<div>
				<Select
					defaultValue={printing}
					onValueChange={(value: TPrintType) => setPrinting(value)}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Выбрать тип' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='all'>Все</SelectItem>
							<SelectItem value='books'>Только книги</SelectItem>
							<SelectItem value='magazines'>Только журналы</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};
