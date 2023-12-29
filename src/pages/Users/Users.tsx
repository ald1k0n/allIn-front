import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

import { Button, Loader, Modal, Table } from '@/components';
import { IUser } from '@/models';
import { useGetUsersQuery, useUpdateUsersMutation } from '@/redux/services';

export default function Users() {
	const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
	const [isOpen, setIsOpen] = useState(true);
	const [rowData, setRowData] = useState<IUser>();
	const [updateUser] = useUpdateUsersMutation();

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
								<Button styles='outline'>Открыть профиль</Button>
							</Link>
						</div>
					</div>
				);
			},
		},
		{
			header: 'Изменить',
			cell: ({ row }: { row: { original: IUser } }) => {
				return (
					<Button
						onClick={() => setRowData(row.original)}
						styles='default'>
						Изменить
					</Button>
				);
			},
		},
	];

	const handleUpdate = async () => {};

	if (isLoadingUsers) {
		return <Loader />;
	}

	return (
		<>
			<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
				<Table
					columns={cols}
					data={users?.data as IUser[]}
				/>
			</main>
			{isOpen && <Modal setIsOpen={setIsOpen}>sdf</Modal>}
		</>
	);
}
