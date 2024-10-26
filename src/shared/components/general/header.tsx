/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HUhbzsOBjQS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent, Button, Badge } from '@/shared/components/ui';

import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
} from '@/shared/components/ui/navigation-menu';
import { navigation } from '@/shared/constants';
import { Link, useLocation } from '@tanstack/react-router';
import { Earth } from 'lucide-react';
import { Layout, Title } from '.';
import { cn } from '@/shared/lib/utils';
import { Search } from '@/pages/home/Search';
import { useFavoritesStore } from '@/shared/store';
import React from 'react';
import { SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

export const Header = () => {
	const location = useLocation();
	const totalAmountFavs = useFavoritesStore((state) => state.totalAmount);

	const [isOpen, setIsOpen] = React.useState(false);
	const handleLinkClick = () => setIsOpen(false);

	return (
		<header>
			<Layout className='py-0'>
				<div className='flex gap-4 py-3 w-full shrink-0 items-center'>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant='outline' size='icon' className='lg:hidden'>
								<MenuIcon className='h-6 w-6' />
								<span className='sr-only'>Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left'>
							<SheetHeader className='sr-only'>
								<SheetTitle>Edit profile</SheetTitle>
								<SheetDescription>
									Make changes to your profile here. Click save when you're done.
								</SheetDescription>
							</SheetHeader>
							<Link href='/' className='logo'>
								<Earth className='h-6 w-6' />
								<Title text='Atlas Books' />
							</Link>
							<div className='grid gap-2 py-6'>
								{navigation.map((link) => (
									<Link
										key={link.id}
										href={link.path}
										onClick={handleLinkClick}
										className={cn(
											'flex gap-2 w-full items-center text-lg font-semibold',
											{
												'text-primary': link.path === location.pathname,
											}
										)}
									>
										{link.name}
										{link.path === '/favorites' && totalAmountFavs > 0 && (
											<Badge>{totalAmountFavs}</Badge>
										)}
									</Link>
								))}
							</div>
						</SheetContent>
					</Sheet>
					<Link href='/' className='logo hidden lg:flex'>
						<Earth />
						<span className='hidden lg:flex'>Atlas</span>
					</Link>
					<NavigationMenu className='hidden lg:flex'>
						<NavigationMenuList>
							{navigation.map((link) => (
								<NavigationMenuLink asChild key={link.id}>
									<Link
										href={link.path}
										className={cn(
											'group inline-flex h-9 w-max items-center gap-2 justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50',
											{
												'text-primary': link.path === location.pathname,
											}
										)}
									>
										{link.name}
										{link.path === '/favorites' && totalAmountFavs > 0 && (
											<Badge>{totalAmountFavs}</Badge>
										)}
									</Link>
								</NavigationMenuLink>
							))}
						</NavigationMenuList>
					</NavigationMenu>
					{location.pathname === '/' && <Search />}
					<div className='ml-auto flex gap-2'>
						{/* <Button variant='outline'>Sign in</Button> */}
						{/* <Button>Sign Up</Button> */}
						<a
							href='https://t.me/Stepanoff_ds'
							target='_blank'
							className='flex gap-2 text-sm items-center'
						>
							<span className='hidden sm:flex'>@Stepanoff_ds</span>
							<img src='/telegram.svg' alt='telegram' />
						</a>
					</div>
				</div>
			</Layout>
		</header>
	);
};

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='4' x2='20' y1='12' y2='12' />
			<line x1='4' x2='20' y1='6' y2='6' />
			<line x1='4' x2='20' y1='18' y2='18' />
		</svg>
	);
}
