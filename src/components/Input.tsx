import { DetailedHTMLProps, InputHTMLAttributes, FC } from 'react';

enum size {
	base = 'h-6',
	medium = 'h-8',
	large = 'h-10',
}

interface IProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label?: string;
	label_color?: string;
	input_size?: 'base' | 'medium' | 'large';
}

export const Input: FC<IProps> = (props) => {
	return (
		<div className='w-full flex flex-col'>
			<div>
				{props.label && (
					<label
						htmlFor={props.label}
						className={`text-lg font-medium text-${
							!props.label_color ? 'black' : props.label_color
						}`}>
						{props.label}
					</label>
				)}
			</div>
			<input
				{...props}
				id={props.label}
				className={`border focus:outline-none px-1 ${
					!props.input_size ? size.base : size[props.input_size]
				} rounded-md `}
			/>
		</div>
	);
};
