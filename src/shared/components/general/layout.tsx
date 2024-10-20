interface Props {
	children: React.ReactNode | React.ReactNode[];
}

export const Layout = ({ children }: Props) => {
	return (
		<>
			<main className='layout'>{children}</main>
		</>
	);
};
