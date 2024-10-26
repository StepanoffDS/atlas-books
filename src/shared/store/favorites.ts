import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Props {
	favorites: string[];
	totalAmount: number;

	toggleFavorite: (id: string) => void;
}

const createFavoritesSlice: StateCreator<
	Props,
	[['zustand/devtools', never]],
	[['zustand/persist', Props]]
> = persist(
	(set) => ({
		favorites: [],
		totalAmount: 0,

		toggleFavorite: (id) => {
			set(
				(state) => {
					const newFavorites = state.favorites.includes(id)
						? state.favorites.filter((bookId) => bookId !== id)
						: [...state.favorites, id];

					return {
						favorites: newFavorites,
						totalAmount: newFavorites.length,
					};
				},
				undefined,
				'FavoritesStore:toggleFavorite'
			);
		},
	}),
	{
		name: 'favorites',
	}
);

export const useFavoritesStore = create<Props>()(
	devtools((...args) => ({
		...createFavoritesSlice(...args),
	}))
);
