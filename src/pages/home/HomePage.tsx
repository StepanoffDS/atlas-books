import { BookList, Layout, Title } from '@/shared/components/general';
import { Filters } from './Filters';
import { useFilterStore } from '@/shared/store';

export const HomePage = () => {
	const query = useFilterStore((state) => state.searchValue);

	return (
		<Layout>
			<div>
				<main className='main'>
					<div>
						<div>
							<div className='flex flex-col gap-4 md:flex-row'>
								<Filters />
								<div>
									<div className='flex items-end'>
										<span className=''>Результат по запросу: </span>
										<Title
											text={query}
											size='xl'
											className='ml-3 leading-none font-medium'
										/>
									</div>
									<BookList className='mt-6' />
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</Layout>
	);
};
