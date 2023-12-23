import { HiSquaresPlus, HiChatBubbleBottomCenter } from 'react-icons/hi2';
import { MdWorkspacePremium } from 'react-icons/md';
import { FC } from 'react';

import { Button, SideButtons } from '.';

interface IProps {
	isOpen?: boolean;
}

export const Sidebar: FC<IProps> = ({ isOpen }) => {
	return (
		<aside
			className={`h-screen ${
				!isOpen ? 'hidden' : 'block'
			} bg-orange-400 md:block w-32 text-white`}>
			<div className='mx-3 my-16 flex flex-col gap-y-3 items-center'>
				<SideButtons link='/'>
					<HiSquaresPlus className='text-white text-3xl' />
				</SideButtons>
				<SideButtons link='/chats'>
					<HiChatBubbleBottomCenter className='text-white text-3xl' />
				</SideButtons>
				<SideButtons link='/business'>
					<MdWorkspacePremium className='text-white text-3xl' />
				</SideButtons>

				<Button styles='logout'>Выйти</Button>
			</div>
		</aside>
	);
};
