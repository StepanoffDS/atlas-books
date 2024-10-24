import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchProps {
	searchValue: string;
	setSearchValue: (value: string) => void;
}

interface ParamsProps {
	onlyRussian: boolean;
	setOnlyRussian: (value: boolean) => void;
}

type FilterStore = SearchProps & ParamsProps;

const createSearchSlice: StateCreator<
	FilterStore,
	[['zustand/devtools', never]],
	[],
	SearchProps
> = (set) => ({
	searchValue: 'React',
	setSearchValue: (value) =>
		set({ searchValue: value }, undefined, 'FilterStore:setSearchValue'),
});

const createFiltersSlice: StateCreator<
	FilterStore,
	[['zustand/devtools', never]],
	[],
	ParamsProps
> = (set) => ({
	onlyRussian: false,
	setOnlyRussian: (value) =>
		set({ onlyRussian: value }, undefined, 'FilterStore:setOnlyRussian'),
});

export const useFilterStore = create<FilterStore>()(
	devtools((...args) => ({
		...createSearchSlice(...args),
		...createFiltersSlice(...args),
	}))
);
