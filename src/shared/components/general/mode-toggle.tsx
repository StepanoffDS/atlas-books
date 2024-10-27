import { Moon, Sun } from 'lucide-react';
import { Button, useTheme } from '../ui';

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<Sun className='h-[1.5rem] w-[1.3rem] dark:hidden' />
			<Moon className='hidden h-5 w-5 dark:block' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}