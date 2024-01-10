/* eslint-disable @typescript-eslint/ban-ts-comment */
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useRef, useState, useEffect } from 'react';

import { Table, Loader, Button, Modal, Input } from '@/components';
import {
	useLazyGetSavedChatsQuery,
	useLazyGetSubscribedChatsQuery,
	useGetChatsQuery,
	useUpdateChatMutation,
	useDeleteChatMutation,
	useGetUsersQuery,
} from '@/redux/services';
import { IUser } from '@/models';
import { IChatModel } from '@/models/chats/chat.model.ts';
import { Link } from 'react-router-dom';

export default function Chats() {
	const { data: chats, isLoading } = useGetChatsQuery();
	const [getSavedChats] = useLazyGetSavedChatsQuery();
	const [getSubChats] = useLazyGetSubscribedChatsQuery();
	const { data: users, isLoading: loadingUsers } = useGetUsersQuery();
	const [updateChat] = useUpdateChatMutation();
	const [deleteChat] = useDeleteChatMutation();

	const [isOpen, setIsOpen] = useState(false);
	const [rowData, setRowData] = useState<IChatModel>();
	const [chat, setChat] = useState(rowData);
	const [file, setFile] = useState(null);
	const [chatType, setChatType] = useState('');
	const [initialChat, setInitialChat] = useState<IChatModel[]>([]);
	const [currentUser, setCurrentUser] = useState<number | null>(null);

	//NOTE - Так делать нельзя, делаю так потому-что нужно закончить до 31 числа, :D!
	useEffect(() => {
		if (!isLoading) setInitialChat(chats?.data as IChatModel[]);
	}, [isLoading, chats?.data]);

	const findChat = async () => {
		if (currentUser)
			if (chatType === '') {
				setInitialChat(chats?.data as IChatModel[]);
			} else if (chatType === 'sub') {
				await getSubChats(currentUser).then((res) =>
					setInitialChat(
						//@ts-ignore
						res.data
					)
				);
			} else if (chatType === 'saved') {
				await getSavedChats(currentUser).then((res) =>
					//@ts-ignore
					setInitialChat(res.data)
				);
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
			header: 'Тип чата',
			cell: ({ row }: { row: { original: IChatModel } }) => {
				return <div> {row.original?.isPersonal ? 'Личный' : 'Общий'} </div>;
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
					<Button
						onClick={() => {
							handleDelete(row.original.id!);
						}}
						styles='logout'>
						Удалить
					</Button>
				);
			},
		},
		{
			header: 'Изменить',
			cell: ({ row }: { row: { original: IChatModel } }) => {
				return (
					<Button
						onClick={() => {
							setRowData(row.original);
							setIsOpen(true);
						}}
						styles='default'>
						Изменить
					</Button>
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

	if (isLoading) return <Loader />;

	return (
		<>
			<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
				<div className='w-full flex justify-between'>
					<div className='text-xl'>
						Количество чатов: {initialChat?.length ? initialChat.length : 0}
					</div>
					<div className={'flex gap-1.5'}>
						<Link to='/chats/location/create'>
							<Button styles='default'>Создать локацию!</Button>
						</Link>
						<Link to='/chats/create'>
							<Button styles='default'>Создать чат!</Button>
						</Link>
					</div>
				</div>
				{loadingUsers ? (
					<Loader />
				) : (
					<div className='flex-col md:flex-row w-full flex justify-between'>
						<div className='w-64 flex items-center gap-1.5'>
							<label htmlFor='user'>Пользователь</label>
							<select
								id='user'
								onChange={(e) => setCurrentUser(Number(e.target.value))}
								className='p-1.5 border border-black rounded-md h-8 focus:outline-none'>
								<option
									value=''
									disabled
									selected>
									Выберите человека
								</option>
								{users?.data.map((user) => (
									<option
										key={user.id}
										value={user.id}>
										{user.name}
									</option>
								))}
							</select>
						</div>

						<div className='w-80 flex items-center'>
							<Button
								disabled={!currentUser}
								onClick={findChat}
								styles='default'>
								Найти
							</Button>
						</div>

						<div className='w-72 flex justify-center flex-col  gap-2'>
							<div className='flex gap-1.5'>
								<label htmlFor='all'>Все</label>
								<input
									id='all'
									type='radio'
									name='chatType'
									defaultChecked
									onChange={(e) => {
										setChatType(e.target.value);
										// setCurrentUser(null);
									}}
									value=''
								/>
							</div>
							<div className='flex gap-1.5'>
								<label htmlFor='saved'>Сохраненные</label>
								<input
									id='saved'
									type='radio'
									name='chatType'
									value='saved'
									onChange={(e) => setChatType(e.target.value)}
								/>
							</div>
							<div className='flex gap-1.5'>
								<label htmlFor='sub'>Подписанные</label>
								<input
									id='sub'
									type='radio'
									name='chatType'
									value='sub'
									onChange={(e) => setChatType(e.target.value)}
								/>
							</div>
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
					<div className='p-3 flex flex-col gap-y-1 w-80'>
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

						<div>
							<label
								htmlFor='photo'
								className={`text-lg font-medium text-color`}>
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
