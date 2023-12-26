import { ReactNode, FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

enum buttonStyles {
	default = 'bg-primary text-white hover:bg-white hover:text-primary',
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
			className={`w-full rounded-3xl px-4 py-1.5 font-bold transition-colors border-2 border-primary ${
				buttonStyles[props.styles]
			}`}>
			{props.children}
		</button>
	);
};
