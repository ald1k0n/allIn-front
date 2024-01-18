import { HiSquaresPlus, HiChatBubbleBottomCenter } from 'react-icons/hi2';
import { IoMdExit } from 'react-icons/io';

import { FaUser } from 'react-icons/fa';
import { useAppDispatch } from '@/hooks';
import { logout } from '@/redux/slices/user.slice';
import { FC } from 'react';

import { SideButtons } from '..';
import { MdCategory } from 'react-icons/md';

interface IProps {
	isOpen?: boolean;
}

export const Sidebar: FC<IProps> = ({ isOpen }) => {
	const dispatch = useAppDispatch();
	return (
		<aside
			className={`min-h-screen ${
				!isOpen ? 'hidden' : 'block'
			} bg-orange-400 md:block w-24 text-white `}>
			<div className='mx-3 my-16 lg:flex hidden flex-col gap-y-3 items-center fixed'>
				<SideButtons
					link='/'
					routename='Главная страница'>
					<HiSquaresPlus className='text-white text-3xl' />
				</SideButtons>
				<SideButtons
					link='/users'
					routename='Пользователи'>
					<FaUser className='text-white text-2xl' />
				</SideButtons>
				<SideButtons
					link='/chats'
					routename='Чаты'>
					<HiChatBubbleBottomCenter className='text-white text-3xl' />
				</SideButtons>
				<SideButtons
					link='/categories'
					routename='Категории'>
					<MdCategory className='text-white text-3xl' />
				</SideButtons>

				<SideButtons
					onClick={() => dispatch(logout())}
					link='/login'
					routename='Выйти'>
					<IoMdExit className='text-red-600 text-3xl' />
				</SideButtons>
			</div>
		</aside>
	);
};
