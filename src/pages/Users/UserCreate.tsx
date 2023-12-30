import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Modal, Input, Loader, Button } from '@/components';
import { useGetLocationsQuery, useCreateUserMutation } from '@/redux/services';
import { IUser } from '@/models';

export default function UserCreate() {
	const [isOpen, setIsOpen] = useState(true);
	const [userData, setUserData] = useState<IUser | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isOpen) navigate('/users');
	}, [isOpen, navigate]);

	const { data: location, isLoading } = useGetLocationsQuery();
	const [createUser] = useCreateUserMutation();
	if (isLoading) return <Loader />;

	const handleSubmit = async () => {
		const values = {
			...userData,
			device_token: '0001',
		};
		// console.log(values);
		await toast
			.promise(createUser(values).unwrap(), {
				success: 'Пользователь успешно создан',
				error: (err) => JSON.stringify(err, null, 2),
				loading: 'Загрузка...',
			})
			.finally(() => navigate('/users'));
	};

	return (
		<Modal setIsOpen={setIsOpen}>
			<div className='w-80 flex flex-col gap-y-2'>
				<Input
					label='Номер телефона'
					placeholder='+77058743762'
					input_size='large'
					onChange={(e) =>
						setUserData((prev) => ({
							...prev,
							phone: e.target.value,
						}))
					}
				/>
				<Input
					label='Имя пользователя'
					placeholder='Василий Пупкин'
					input_size='large'
					onChange={(e) =>
						setUserData((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
				/>

				<div className='w-full'>
					<label
						htmlFor='location'
						className={`text-lg font-medium text-black`}>
						Местоположение
					</label>
					<select
						id='location'
						onChange={(e) =>
							setUserData((prev) => ({
								...prev,
								location_id: Number(e.target.value),
							}))
						}
						className='w-full border h-8'>
						<option
							value=''
							disabled
							selected>
							Выберите местоположение
						</option>
						{location?.locations.map((location) => (
							<option
								key={location.id}
								value={location?.id}>
								{location.name}
							</option>
						))}
					</select>
				</div>

				<Button
					styles='default'
					onClick={handleSubmit}>
					Создать
				</Button>
			</div>
		</Modal>
	);
}
