import { useAppSelector } from '@/hooks';
import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Sidebar } from '../index';

interface IProps {
	children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
	const { isOpen } = useAppSelector((state) => state.interaction);
	const navigate = useNavigate();
	const { accessToken, user } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (!accessToken || user?.role !== 'admin') navigate('/login');
	}, [accessToken, navigate, user]);

	return (
		<>
			<div className='flex'>
				<Sidebar isOpen={isOpen} />
				<Header>{children}</Header>
			</div>
		</>
	);
};
