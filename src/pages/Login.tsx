import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { ILogin } from '../models';
import { Button, Input } from '../components';
import logo from '../assets/logo.jpg';

export default function Login() {
	const { register, handleSubmit, setValue } = useForm<ILogin>();

	const onSubmit: SubmitHandler<ILogin> = async (data) => {
		console.log(data);
	};

	return (
		<main className='w-full bg-white min-h-screen flex justify-center items-center'>
			<form
				className='w-96 h-96 rounded-xl p-2 flex justify-center items-center flex-col gap-y-2'
				onSubmit={handleSubmit(onSubmit)}>
				<div className='w-20 h-20 '>
					<img
						src={logo}
						className='rounded-full'
						alt='Logo'
					/>
				</div>

				<Input
					{...register('phone', { required: 'Номер телефона обязателен' })}
					label='Номер телефона'
					label_color='black'
					placeholder='+7 777 777 77 77'
					input_size='large'
					onChange={(e) => setValue('phone', e.target.value)}
				/>
				<div className='w-full'>
					<Button
						type='submit'
						styles='default'>
						Войти
					</Button>
				</div>
			</form>
		</main>
	);
}
