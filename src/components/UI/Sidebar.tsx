import { HiSquaresPlus, HiChatBubbleBottomCenter } from 'react-icons/hi2';
import { FaUser } from 'react-icons/fa';
import { useAppDispatch } from '@/hooks';
import { logout } from '@/redux/slices/user.slice';
import { FC } from 'react';

import { Button, SideButtons } from '..';

interface IProps {
	isOpen?: boolean;
}

export const Sidebar: FC<IProps> = ({ isOpen }) => {
	const dispatch = useAppDispatch();
	return (
		<aside
			className={`min-h-screen ${
				!isOpen ? 'hidden' : 'block'
			} bg-orange-400 md:block w-32 text-white `}>
			<div className='mx-3 my-16 flex flex-col gap-y-3 items-center'>
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

				<div className='absolute bottom-12'>
					<Button
						onClick={() => dispatch(logout())}
						styles='logout'>
						Выйти
					</Button>
				</div>
			</div>
		</aside>
	);
};
