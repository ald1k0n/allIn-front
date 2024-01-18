import { FC, ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
	children: ReactNode;
	link?: string;
	routename: string;
	onClick?: () => void;
}

enum LINK_STATUS {
	active = 'bg-orange-300',
	inactive = 'hover:bg-orange-300',
}

export const SideButtons: FC<IProps> = ({
	children,
	link,
	routename,
	onClick,
}) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div
			onClick={onClick && onClick}
			className='relative group flex items-center'>
			<NavLink
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				to={link!}
				className={({ isActive }) =>
					`w-16 h-16 flex justify-center rounded-2xl items-center ${
						isActive ? LINK_STATUS.active : LINK_STATUS.inactive
					} transition-colors cursor-pointer`
				}>
				{children}
			</NavLink>
			<div
				className={`absolute ${
					isHovering ? '' : 'hidden'
				} bg-black bg-opacity-50 rounded-xl p-3 text-white left-24 text-center`}>
				{routename}
			</div>
		</div>
	);
};
