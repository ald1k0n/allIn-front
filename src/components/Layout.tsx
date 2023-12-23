import { ReactNode, FC } from 'react';
import { Sidebar, Header } from '.';
import { useAppSelector } from '../hooks';

interface IProps {
	children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
	const { isOpen } = useAppSelector((state) => state.interaction);

	return (
		<>
			<div className='flex'>
				<Sidebar isOpen={isOpen} />
				<Header>{children}</Header>
			</div>
		</>
	);
};
