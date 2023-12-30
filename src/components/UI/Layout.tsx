import { ReactNode, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Header } from '../index';
import { useAppSelector } from '@/hooks';

interface IProps {
	children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
	const { isOpen } = useAppSelector((state) => state.interaction);
	const navigate = useNavigate();
	const { accessToken } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (!accessToken) navigate('/login');
	}, [accessToken, navigate]);

	return (
		<>
			<div className='flex'>
				<Sidebar isOpen={isOpen} />
				<Header>{children}</Header>
			</div>
		</>
	);
};
