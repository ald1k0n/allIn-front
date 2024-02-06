/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Input, Loader, Modal, Button } from '@/components';
import {
	useCreateChatMutation,
	useGetLocationsQuery,
	useGetChatTypeQuery,
} from '@/redux/services';
import { IChatModel } from '@/models/chats/chat.model';

export default function ChatCreate() {
	const [isOpen, setIsOpen] = useState(true);
	const [chatData, setChatData] = useState<IChatModel | null>(null);
	const [file, setFile] = useState<any>(null);

	const navigate = useNavigate();
	const fileRef = useRef<any>(null);

	const [createChat] = useCreateChatMutation();
	const { data: locations, isLoading: locationsLoading } =
		useGetLocationsQuery();
	const { data: chatTypes, isLoading: typesLoading } = useGetChatTypeQuery();

	useEffect(() => {
		if (!isOpen) navigate('/chats');
	}, [isOpen, navigate]);

	const handleSubmit = async () => {
		const formData = new FormData();

		Object.keys(chatData!).map((d: any) => {
			//@ts-ignore
			formData.append(d, chatData[d]);
		});

		if (file) {
			formData.append('photo', file);
		}
		await toast
			.promise(createChat(formData).unwrap(), {
				success: 'Успешно создан чат',
				error: (err) => JSON.stringify(err, null, 2),
				loading: 'Загрузка...',
			})
			.finally(() => navigate('/chats'));
	};

	if (locationsLoading && typesLoading) return <Loader />;

	return (
		<Modal setIsOpen={setIsOpen}>
			<div className='p-3 flex flex-col gap-y-4'>
				<div className='text-center text-xl'>Создать чат!</div>
				<Input
					label='Название чата'
					input_size='medium'
					placeholder='Чат'
					onChange={(e) =>
						setChatData((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
				/>
				<div className='w-full'>
					<label
						htmlFor='location'
						className='text-lg font-medium'>
						Местоположение
					</label>
					<select
						onChange={(e) => {
							//@ts-ignore
							setChatData((prev) => ({
								...prev,

								location_id: Number(e.target.value!),
							}));
						}}
						id='location'
						className='w-full h-8 border'>
						<option
							value=''
							selected
							disabled>
							Выберите местоположение
						</option>
						{locations?.locations.map((location) => (
							<option
								value={location.id}
								key={location.id}>
								{location.name}
							</option>
						))}
					</select>
				</div>
				<div className='w-full flex justify-between items-center'>
					<label
						htmlFor='pin'
						className='w-full text-md text-lg font-medium'>
						Закрепить локацию?
					</label>
					<input
						type='checkbox'
						id='pin'
						onChange={(e) =>
							setChatData((prev) => {
								return {
									...prev,
									isLocationPinned: e.target.checked,
								} as IChatModel;
							})
						}
					/>
				</div>
				<div className='w-full'>
					<label
						htmlFor='type'
						className='text-lg font-medium'>
						Тип чата
					</label>
					<select
						onChange={(e) => {
							//@ts-ignore
							setChatData((prev) => ({ ...prev, type_id: e.target.value }));
						}}
						id='type'
						className='w-full h-8 border'>
						<option
							value=''
							selected
							disabled>
							Выберите тип чата
						</option>
						{chatTypes?.chatTypes.map((type) => (
							<option
								value={type.id}
								key={type.id}>
								{type.title}
							</option>
						))}
					</select>
				</div>
				<div className='w-full'>
					<Button
						onClick={() => fileRef.current.click()}
						styles='outline'>
						Загрузить изображение
					</Button>
					<input
						type='file'
						hidden
						ref={fileRef}
						onChange={(e) => setFile((e.target?.files as FileList)[0])}
					/>
				</div>
				<Button
					onClick={handleSubmit}
					styles='default'>
					Создать чат!
				</Button>
			</div>
		</Modal>
	);
}
