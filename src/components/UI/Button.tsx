import { ReactNode, FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

enum buttonStyles {
	default = 'bg-orange-400 text-white hover:bg-white hover:text-primary',
	outline = 'text-primary hover:bg-primary hover:text-white',
	logout = 'bg-red-500 text-white hover:bg-white hover:text-red-500 border-2 border-red-500',
}

interface IProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: ReactNode;
	styles: 'default' | 'outline' | 'logout';
}

export const Button: FC<IProps> = (props) => {
	return (
		<button
			{...props}
			className={`w-full text-xs md:text-base rounded-3xl px-1 py-0.5 md:px-4 md:py-1.5 font-bold transition-colors border-2 disabled:bg-opacity-50 disabled:cursor-not-allowed border-primary ${
				buttonStyles[props.styles]
			}`}>
			{props.children}
		</button>
	);
};
