import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Props {
	searchValue: string;
	setSearchValue: (value: string) => void;
	onlyRussian: boolean;
	setOnlyRussian: (value: boolean) => void;
	onlyDownload: boolean;
	setOnlyDownload: (value: boolean) => void;
	filterType: TFilter;
	setFilterType: (value: TFilter) => void;
	ordering: TOrderBy;
	setOrdering: (value: TOrderBy) => void;
	printing: TPrintType;
	setPrinting: (value: TPrintType) => void;
}

const createFiltersSlice: StateCreator<
	Props,
	[['zustand/devtools', never]],
	[],
	Props
> = (set) => ({
	searchValue: 'React',
	setSearchValue: (value) =>
		set({ searchValue: value }, undefined, 'FilterStore:setSearchValue'),

	onlyRussian: false,
	setOnlyRussian: (value) =>
		set({ onlyRussian: value }, undefined, 'FilterStore:setOnlyRussian'),

	onlyDownload: false,
	setOnlyDownload: (value) =>
		set({ onlyDownload: value }, undefined, 'FilterStore:setOnlyDownload'),

	filterType: 'ebooks',
	setFilterType: (value) =>
		set({ filterType: value }, undefined, 'FilterStore:setFilterType'),

	ordering: 'relevance',
	setOrdering: (value) => set({ ordering: value }, undefined, 'FilterStore:ordering'),

	printing: 'all',
	setPrinting: (value) => set({ printing: value }, undefined, 'FilterStore:setPrinting'),
});

export const useFilterStore = create<Props>()(
	devtools((...args) => ({
		...createFiltersSlice(...args),
	}))
);
