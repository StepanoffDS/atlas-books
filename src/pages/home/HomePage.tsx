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
							<div className='relative flex flex-col gap-4 md:flex-row'>
								<Filters />
								<div className='flex-1'>
									{query && (
										<div className='flex flex-col lg:items-end lg:flex-row'>
											<span className=''>Результат по запросу: </span>
											<Title
												text={query}
												size='xl'
												className='leading-none font-medium lg:ml-3'
											/>
										</div>
									)}
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
