import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { Button, Loader, Table } from '@/components';
import { IUser } from '@/models';
import { useGetUsersQuery } from '@/redux/services';

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
				<div>{format(new Date(row.original.createdAt), 'dd MMMM yyyy')}</div>
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
];

export default function Users() {
	const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();

	if (isLoadingUsers) {
		return <Loader />;
	}
	return (
		<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
			<Table
				columns={cols}
				data={users?.users as IUser[]}
			/>
		</main>
	);
}
