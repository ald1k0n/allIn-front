import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState, useRef } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import { Button, Loader, Modal, Table, Input } from '@/components';
import { IUser } from '@/models';
import { useAppDispatch } from '@/hooks';
import {
	useGetUsersQuery,
	useUpdateUsersMutation,
	useDeleteUserMutation,
} from '@/redux/services';
import { setUserProfile } from '@/redux/slices/interaction.slice';

export default function Users() {
	const [isOpen, setIsOpen] = useState(false);
	const [rowData, setRowData] = useState<IUser>();
	const [user, setUser] = useState(rowData);
	const [file, setFile] = useState(null);
	const dispatch = useAppDispatch();

	const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
	const [updateUser] = useUpdateUsersMutation();
	const [deleteUser] = useDeleteUserMutation();

	const fileRef = useRef(null);

	const cols = [
		{
			header: 'id',
			accessorKey: 'id',
		},
		{
			header: 'Имя пользователя',
			accessorKey: 'name',
		},
		{
			header: 'Номер телефона',
			accessorKey: 'phone',
		},
		{
			header: 'Роль',
			accessorKey: 'role',
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
			header: 'Профили пользователя',
			cell: ({ row }: { row: { original: IUser } }) => {
				return (
					<div className='w-full flex justify-center'>
						<div className='w-2/3'>
							<Link to={`/users/${row.original.id}`}>
								<Button
									onClick={() => {
										dispatch(setUserProfile(row.original.name));
									}}
									styles='outline'>
									Открыть
								</Button>
							</Link>
						</div>
					</div>
				);
			},
		},
		{
			header: 'Удалить',
			cell: ({ row }: { row: { original: IUser } }) => {
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
			cell: ({ row }: { row: { original: IUser } }) => {
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
			// ...rowData,
			...user,
			id: rowData?.id,
		};

		const formData = new FormData();

		Object.keys(values).map((key) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			formData.append(key, values[key]);
		});
		// console.log(formData.get('id'));
		if (file) {
			formData.append('avatar', file);
		}

		await toast
			.promise(updateUser(formData).unwrap(), {
				success: 'Успешно обновлен пользователь',
				loading: 'Загрузка...',
				error: (err) => JSON.stringify(err, null, 2),
			})
			.finally(() => setIsOpen(false));
	};

	const handleDelete = async (id: number) => {
		await toast.promise(deleteUser(id).unwrap(), {
			success: 'Успешно удален пользователь',
			loading: 'Загрузка...',
			error: (err) => JSON.stringify(err, null, 2),
		});
	};

	if (isLoadingUsers) {
		return <Loader />;
	}

	return (
		<>
			<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
				<div className='w-full flex justify-between'>
					<div className='text-xl'>Количество аккаунтов {users?.count}</div>
					<Link to='/users/create'>
						<Button styles='default'>Создать пользователя</Button>
					</Link>
				</div>
				<Table
					columns={cols}
					data={users?.data as IUser[]}
				/>
			</main>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<div className='p-3 flex flex-col gap-y-4 w-80'>
						<div className='text-center text-lg'>
							Пользователь {rowData?.name}
						</div>
						<Input
							input_size={'medium'}
							defaultValue={rowData?.name}
							value={user?.name}
							onChange={(e) => setUser({ ...user, name: e.target.value })}
							type='text'
							placeholder={'Имя пользователя'}
							label={'Имя пользователя'}
						/>

						<Input
							input_size={'medium'}
							defaultValue={rowData?.phone}
							value={user?.phone}
							onChange={(e) => setUser({ ...user, phone: e.target.value })}
							type='text'
							placeholder={'Номер телефона'}
							label={'Номер телефона'}
						/>
						<div>
							<label
								htmlFor='avatar'
								className={`text-lg font-medium text-color`}>
								Аватар
							</label>

							<Button
								disabled={!!file}
								onClick={() => (fileRef?.current as any)?.click()}
								styles='outline'>
								Загрузить аватар
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
						<div>
							<label
								htmlFor='role'
								className={`text-lg font-medium text-color`}>
								Роли
							</label>
							<select
								id='role'
								className='w-full border h-8'
								defaultValue={user?.role}
								onChange={(e) => setUser({ ...user, role: e.target.value })}>
								<option
									value=''
									selected={true}
									disabled={true}>
									Выберите роль
								</option>
								<option value='admin'>Админ</option>
								<option value='client'>Клиент</option>
							</select>
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
