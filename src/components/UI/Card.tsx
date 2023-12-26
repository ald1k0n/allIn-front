import { ReactNode, FC } from 'react';

interface IProps {
	children: ReactNode;
}

export const Card: FC<IProps> = ({ children }) => {
	return <div className='p-5 bg-white rounded-md shadow-md'>{children}</div>;
};
