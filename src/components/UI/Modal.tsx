import { Dispatch } from '@reduxjs/toolkit';
import { ReactNode, FC, SetStateAction } from 'react';
import { RxCross1 } from 'react-icons/rx';

interface IProps {
	children: ReactNode;
	setIsOpen: Dispatch<SetStateAction<any>>;
}

export const Modal: FC<IProps> = ({ children, setIsOpen }) => {
	return (
		<div className='w-full flex justify-center items-center min-h-screen bg-black bg-opacity-45 fixed top-0'>
			<div className='px-3 py-2.5 bg-white rounded-md'>
				<div className='w-full flex justify-end'>
					<RxCross1
						className='cursor-pointer'
						onClick={() => setIsOpen(false)}
					/>
				</div>
				{children}
			</div>
		</div>
	);
};
