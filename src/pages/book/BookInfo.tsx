import { BookCover, FavoriteButton, Title } from '@/shared/components/general';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { Link } from '@tanstack/react-router';
import { CircleAlert } from 'lucide-react';
import React from 'react';

interface Props {
	id: string;
	data: IBook;
}

export const BookInfo = ({ id, data }: Props) => {
	const {
		volumeInfo: {
			title,
			authors,
			publisher,
			publishedDate,
			description,
			imageLinks,
			pageCount,
			categories,
			language,
		},
		saleInfo: {
			listPrice: { amount, currencyCode },
		},
	} = data;

	const [isExpanded, setIsExpanded] = React.useState(false);

	const toggleReadMore = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<main className='relative flex flex-col smd:flex-row gap-4'>
			{/* Image */}
			<div className='w-[250px] shrink-0 mx-auto'>
				<img
					src={imageLinks?.thumbnail ?? imageLinks?.smallThumbnail}
					className='w-full object-cover object-center'
					alt={title}
					onError={(e) => {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						(e.target as any).replaceWith(<BookCover title={title} />);
					}}
				/>
			</div>
			{/* Info */}
			<div className='col-span-3 smd:relative'>
				<Title text={title} size='lg' className='font-medium smd:max-w-[80%]' />
				{authors && (
					<Title
						text={authors?.map((author) => author).join(', ') ?? ''}
						size='xs'
						className='text-slate-600 smd:max-w-[60%]'
					/>
				)}

				<div className='text-slate-500 dark:text-slate-300 mt-5 grid smd:max-w-[50%]'>
					<p>
						<span>Выпуск: </span>
						{publishedDate}
					</p>
					<p>
						<span>Издатель: </span>
						{publisher}
					</p>
					<p>
						<span>Кол-во стр.: </span>
						{pageCount}
					</p>
					<p>
						<span>Категории: </span>
						{categories}
					</p>
					<p>
						<span>Язык: </span>
						{language}
					</p>
				</div>

				<div className='mt-5 smd:max-w-[80%] text-slate-800 dark:text-slate-100'>
					<div className={`text-container ${isExpanded ? 'expanded' : ''}`}>
						{isExpanded ? (
							<div dangerouslySetInnerHTML={{ __html: description }} />
						) : (
							<div
								dangerouslySetInnerHTML={{ __html: description?.slice(0, 200) + '...' }}
							/>
						)}
					</div>
					{description.length > 200 && (
						<button onClick={toggleReadMore} className='text-slate-500 font-medium'>
							{isExpanded ? 'Скрыть' : 'Еще'}
						</button>
					)}
				</div>

				<div className='mt-3'>
					<Title text={`Цена: ${amount} ${currencyCode}`} size='sm' />
					<div className='flex gap-3 items-center mt-3'>
						<Link target='_blank' to={data.volumeInfo.infoLink}>
							<Button>Источник</Button>
						</Link>
						<Popover>
							<PopoverTrigger>
								<CircleAlert className='w-6 h-6 text-slate-500 transition-colors hover:text-slate-700 dark:hover:text-slate-300' />
							</PopoverTrigger>
							<PopoverContent className='w-full'>Открывается только с VPN</PopoverContent>
						</Popover>
					</div>
				</div>

				<FavoriteButton
					id={id}
					className='absolute top-3 right-3 shadow-md shadow-gray-700/80 smd:shadow-none'
				/>
			</div>
		</main>
	);
};
