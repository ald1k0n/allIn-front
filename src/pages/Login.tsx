/* eslint-disable @typescript-eslint/ban-ts-comment */
import logo from '@/assets/logo.jpg';
import { Button, Input } from '@/components';
import { useAppDispatch } from '@/hooks';
import { ILogin } from '@/models';
import { useSendCodeMutation } from '@/redux/services';
import { login } from '@/redux/slices/user.slice';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const { register, handleSubmit, setValue } = useForm<ILogin>();
	const [sendCode] = useSendCodeMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		phone: '',
		code: '',
	});

	const getCode: SubmitHandler<{ phone: string }> = async ({ phone }) => {
		await sendCode({ phone })
			.then(() => toast.success('Ожидайте код в течений минуты'))
			.catch(() => {
				toast.error('Произошла ошибка сервиса отправки сообщений');
			});

		setCredentials((prev) => ({
			...prev,
			phone,
		}));
	};

	const Login = async () => {
		const values: ILogin = {
			...credentials,
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
				onSubmit={handleSubmit(getCode)}>
				<div className='w-20 h-20 '>
					<img
						src={logo}
						className='rounded-full'
						alt='Logo'
					/>
				</div>

				{credentials.phone.length === 0 ? (
					<>
						<InputMask
							mask='+79999999999'
							//@ts-ignore
							onChange={(e) => setValue('phone', e.target.value)}
							{...register('phone', { required: 'Номер телефона обязателен' })}>
							{
								//@ts-ignore
								(inputProps) => (
									<Input
										{...inputProps}
										label='Номер телефона'
										label_color='black'
										placeholder='+77777777777'
										input_size='large'
									/>
								)
							}
						</InputMask>
						<div className='w-full'>
							<Button
								type='submit'
								styles='default'>
								Отправить код
							</Button>
						</div>
					</>
				) : (
					<>
						<InputMask
							mask='9999'
							onChange={(e) => {
								setCredentials((prev) => ({ ...prev, code: e.target.value }));
							}}>
							{
								//@ts-ignore
								(inputProps: any) => (
									<Input
										{...inputProps}
										input_size='large'
										label='Код'
										placeholder='9999'
									/>
								)
							}
						</InputMask>
						<div className='w-full'>
							<Button
								type='button'
								onClick={Login}
								styles='default'>
								Войти
							</Button>
						</div>
					</>
				)}
			</form>
		</main>
	);
}
