import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ILogin } from '../models';
import { useAppDispatch } from '../hooks';
import { Button, Input } from '../components';
import logo from '../assets/logo.jpg';
import { login } from '../redux/slices/user.slice';
export default function Login() {
	const { register, handleSubmit, setValue } = useForm<ILogin>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<ILogin> = async (data) => {
		const values: ILogin = {
			...data,
			code: '1935',
			device_token: '0101',
		};
		await toast
			.promise(dispatch(login(values)).unwrap(), {
				loading: 'Загрузка...',
				error: 'Ошибка',
				success: 'Добро пожаловать!',
			})
			.then(() => navigate('/'))
			.catch(() => toast.error('Ошибка'));
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
