import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
	children: ReactNode;
	link: string;
}

enum LINK_STATUS {
	active = 'bg-orange-300',
	inactive = 'hover:bg-orange-300',
}

export const SideButtons: FC<IProps> = ({ children, link }) => {
	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`w-16 h-16 flex justify-center rounded-2xl items-center ${
					isActive ? LINK_STATUS.active : LINK_STATUS.inactive
				} transition-colors cursor-pointer`
			}>
			{children}
		</NavLink>
	);
};
