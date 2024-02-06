/* eslint-disable @typescript-eslint/ban-ts-comment */
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useRef, useState, useEffect } from 'react';

import { Table, Loader, Button, Modal, Input } from '@/components';
import {
	useLazyGetSavedChatsQuery,
	useLazyGetSubscribedChatsQuery,
	useUpdateChatMutation,
	useDeleteChatMutation,
	useGetUsersQuery,
	useGetLocationsQuery,
	useGetChatTypeQuery,
	useLazyGetChatsQuery,
} from '@/redux/services';
import { IUser } from '@/models';
import { IChatModel } from '@/models/chats/chat.model.ts';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';

export default function Chats() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isLoading: loadingUsers } = useGetUsersQuery();
	const { data: locations, isLoading: locationsLoading } =
		useGetLocationsQuery();

	const { data: chatTypes, isLoading: typesLoading } = useGetChatTypeQuery();

	const [fetchChats] = useLazyGetChatsQuery();
	const [getSavedChats] = useLazyGetSavedChatsQuery();
	const [getSubChats] = useLazyGetSubscribedChatsQuery();
	const [updateChat] = useUpdateChatMutation();
	const [deleteChat] = useDeleteChatMutation();

	const [isOpen, setIsOpen] = useState(false);
	const [rowData, setRowData] = useState<IChatModel>();
	const [chat, setChat] = useState(rowData);
	const [file, setFile] = useState(null);
	const [chatType] = useState('');
	const [initialChat, setInitialChat] = useState<any>([]);
	const [currentUser] = useState<number | null>(null);

	const [typeId, setTypeId] = useState<number | null>(null);
	const [locationId, setLocationId] = useState<number | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		fetchChats({}).then(({ data }) => setInitialChat(data?.data));
	}, [fetchChats]);

	const findChat = async () => {
		if (currentUser) {
			if (chatType === 'all') {
				await fetchChats({}).then(({ data }) => setInitialChat(data?.data));
			} else if (chatType === 'sub') {
				await getSubChats(currentUser).then((res) =>
					setInitialChat(res.data?.chats)
				);
			} else if (chatType === 'saved') {
				await getSavedChats(currentUser).then((res) =>
					//@ts-ignore
					setInitialChat(res?.data.chats)
				);
			}
		} else {
			await fetchChats({
				typeId: typeId as number,
				locationId: locationId as number,
			}).then(({ data }) => setInitialChat(data?.data));
		}
	};

	const fileRef = useRef(null);

	const cols = [
		{
			header: 'id',
			accessorKey: 'id',
		},
		{
			header: 'Название',
			accessorKey: 'title',
		},
		{
			header: 'Чат закреплен',
			cell: ({ row }: { row: any }) => (
				<div>
					{row.original.isLocationPinned ? 'Закреплен' : 'Не закреплен'}
				</div>
			),
		},
		{
			header: 'Тип чата',
			cell: ({ row }: { row: { original: IChatModel } }) => {
				return (
					<div>
						{
							chatTypes?.chatTypes.find(
								(type: any) => type.id === row.original?.type_id
							)?.title
						}
					</div>
				);
			},
		},
		{
			header: 'Photo',
			cell: ({ row }: { row: { original: IChatModel } }) => {
				return (
					<div className={'w-32 h-32 flex justify-center items-center'}>
						<img
							className='w-full h-full'
							src={row.original.photo!}
							alt='Photo'
						/>
					</div>
				);
			},
		},
		{
			header: 'Под-чаты',
			cell: ({ row }: { row: { original: IChatModel } }) => (
				<div>
					<Button
						onClick={() => navigate(`/chats/${row.original.id}/subchats`)}
						styles='default'>
						Открыть
					</Button>
				</div>
			),
		},
		{
			header: 'Дата создания',
			accessorKey: 'createdAt',
			cell: ({ row }: { row: { original: IUser } }) => {
				return (
					<div>
						{format(
							new Date(row.original?.createdAt as string),
							'dd MMMM yyyy'
						)}
					</div>
				);
			},
		},
		{
			header: 'Удалить',
			cell: ({ row }: { row: { original: IChatModel } }) => {
				return (
					<div className='w-full flex justify-center'>
						<div
							onClick={() => handleDelete(row.original.id!)}
							className='w-8 h-8 rounded-full bg-red-500 flex justify-center items-center'>
							<MdDelete className='w-full text-center text-xl text-white  cursor-pointer' />
						</div>
					</div>
				);
			},
		},
		{
			header: 'Изменить',
			cell: ({ row }: { row: { original: IChatModel } }) => {
				return (
					<div className='w-full flex justify-center'>
						<div
							onClick={() => {
								setRowData(row.original);
								setIsOpen(true);
							}}
							className='w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center'>
							<MdEdit className='w-full text-center text-xl cursor-pointer text-white' />
						</div>
					</div>
				);
			},
		},
	];

	const handleUpdate = async () => {
		const values = {
			...chat,
			id: rowData?.id,
		};

		const formData = new FormData();

		Object.keys(values).map((key) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			formData.append(key, values[key]);
		});

		if (file) {
			formData.append('photo', file);
		}

		await toast
			.promise(updateChat(formData).unwrap(), {
				success: 'Успешно обновлен пользователь',
				loading: 'Загрузка...',
				error: (err) => JSON.stringify(err, null, 2),
			})
			.finally(() => setIsOpen(false));
	};

	const handleDelete = async (id: number) => {
		await toast.promise(deleteChat(id).unwrap(), {
			success: 'Успешно удален пользователь',
			loading: 'Загрузка...',
			error: (err) => JSON.stringify(err, null, 2),
		});
	};

	if (locationsLoading || typesLoading) return <Loader />;

	return (
		<>
			<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
				<div className='w-full flex justify-between'>
					<div className='text-xl'>
						Количество чатов: {initialChat?.length ? initialChat.length : 0}
					</div>
					<div className={'flex gap-1.5'}>
						<Link to='/chats/create'>
							<Button styles='default'>Создать чат</Button>
						</Link>
					</div>
				</div>
				{loadingUsers ? (
					<Loader />
				) : (
					<div className='md:flex-row w-full flex'>
						<div className='w-full flex'>
							{/* <div className='w-full flex flex-col items-center gap-1.5'>
								<select
									id='user'
									onChange={(e) => setCurrentUser(Number(e.target.value))}
									className='border'>
									<option
										value={undefined}
										selected>
										Выберите пользователя
									</option>
									{users?.data.map((user) => (
										<option
											key={user.id}
											value={user.id}>
											{user.name}
										</option>
									))}
								</select>
							</div> */}
							{/* <div className='w-full flex-col flex items-center gap-1.5'>
								<select
									id='sub-chat'
									disabled={currentUser ? false : true}
									onChange={(e) => {
										setChatType(e.target.value);
									}}
									className='border'>
									<>
										{[
											{
												name: 'Все',
												option: 'all',
											},
											{
												name: 'Сохранненые',
												option: 'saved',
											},
											{
												name: 'Подписанные',
												option: 'sub',
											},
										].map((chattype) => (
											<option
												value={chattype.option}
												key={chattype.name}>
												{chattype.name}
											</option>
										))}
									</>
								</select>
							</div> */}

							<div className='w-full flex-col flex items-center  gap-2'>
								<select
									disabled={currentUser ? true : false}
									id='type'
									onChange={(e) => setLocationId(Number(e.target.value))}
									className='border'>
									{/* {console.log(chatType)} */}
									<option
										selected
										disabled
										value={undefined}>
										Выберите локацию чата
									</option>
									{locations?.locations.map((type: any) => (
										<option
											value={type.id as number}
											key={type.id as number}>
											{type.name as string}
										</option>
									))}
								</select>
							</div>
							<div className='w-full flex-col flex items-center  gap-2'>
								<select
									id='type'
									onChange={(e) => setTypeId(Number(e.target.value))}
									className='border'>
									<option
										selected
										disabled
										value={undefined}>
										Выберите категорию чата
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
						</div>
						<div className='w-24 lg:w-80 flex items-center'>
							<Button
								// disabled={!currentUser}
								onClick={findChat}
								styles='default'>
								Найти
							</Button>
						</div>
					</div>
				)}

				<Table
					columns={cols}
					data={initialChat as IChatModel[]}
				/>
			</main>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<div className='p-3 flex flex-col gap-y-4 w-80'>
						<div className='text-center text-lg'>Название {rowData?.title}</div>
						<Input
							input_size={'medium'}
							defaultValue={rowData?.title}
							value={chat?.title}
							onChange={(e) => setChat({ ...chat, title: e.target.value })}
							type='text'
							placeholder={'Название'}
							label={'Название'}
						/>

						<div className='w-full'>
							<label
								htmlFor='type'
								className='text-lg font-medium'>
								Категории чата
							</label>
							<select
								onChange={(e) => {
									//@ts-ignore
									setChat((prev) => ({ ...prev, type_id: e.target.value }));
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

						<div className='w-full flex justify-between items-center'>
							<label
								htmlFor='pin'
								className='w-full text-lg text-wrap font-medium'>
								Закрепить локацию?
							</label>

							<input
								type='checkbox'
								id='pin'
								defaultChecked={rowData?.isLocationPinned}
								onChange={(e) =>
									setChat((prev) => {
										return {
											...prev,
											isLocationPinned: e.target.checked,
										} as IChatModel;
									})
								}
							/>
						</div>
						<div className='w-full flex flex-col'>
							<label
								htmlFor='location'
								className='w-full text-lg font-medium'>
								Местоположение
							</label>
							<select
								disabled={!chat?.isLocationPinned}
								onChange={(e) =>
									setChat((prev) => {
										return {
											...prev,
											location_id: Number(e.target.value) as number,
										} as IChatModel;
									})
								}
								id='location'
								className='w-full outline-none border-2'>
								<option
									value=''
									disabled
									selected>
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
						<div>
							<label
								htmlFor='photo'
								className={`text-lg font-medium`}>
								Лого
							</label>

							<Button
								disabled={!!file}
								onClick={() => (fileRef?.current as any)?.click()}
								styles='outline'>
								Загрузить лого
							</Button>
							<input
								type='file'
								hidden
								ref={fileRef}
								onChange={(e) => {
									setFile((e.target as any).files[0]);
									// console.log((e.target as any).files[0]);
								}}
							/>
						</div>
						<Button
							styles={'default'}
							onClick={handleUpdate}>
							Отправить
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
}
