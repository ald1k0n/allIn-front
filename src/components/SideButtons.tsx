import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
	children: ReactNode;
	link: string;
}

export const SideButtons: FC<IProps> = ({ children, link }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(link)}
			className='w-16 h-16 flex justify-center rounded-2xl items-center hover:bg-orange-300 transition-colors cursor-pointer'>
			{children}
		</div>
	);
};
