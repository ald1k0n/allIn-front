import { Button, Loader, Table, Modal, Input } from '@/components';
import { ILocationModel } from '@/models/location.model';
import {
	useGetLocationsQuery,
	useDeleteLocationMutation,
	useUpdateLocationMutation,
} from '@/redux/services';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useState } from 'react';

export default function Locations() {
	const [rowData, setRowData] = useState<ILocationModel>();
	const [isOpen, setIsOpen] = useState(false);
	const [locationName, setLocationName] = useState('');
	const { data, isLoading, isFetching } = useGetLocationsQuery();
	const [deleteLocation] = useDeleteLocationMutation();
	const [updateLocation] = useUpdateLocationMutation();

	const navigation = useNavigate();
	const cols = [
		{
			header: 'id',
			accessorKey: 'id',
		},
		{
			header: 'Название',
			accessorKey: 'name',
		},
		{
			header: 'Удалить',
			cell: ({ row }: { row: { original: ILocationModel } }) => {
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
			cell: ({ row }: { row: { original: ILocationModel } }) => {
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

	const handleDelete = async (id: number) => {
		await toast.promise(deleteLocation(id).unwrap(), {
			success: 'Успешно удалена локация',
			loading: 'Загрузка...',
			error: (err) => JSON.stringify(err, null, 2),
		});
	};

	const handleEdit = async (id: number) => {
		const data: ILocationModel = {
			name: locationName,
			id,
		};

		await toast
			.promise(updateLocation(data).unwrap(), {
				success: 'Успешно обновленна локация',
				loading: 'Загрузка...',
				error: (err) => JSON.stringify(err, null, 2),
			})
			.finally(() => {
				setIsOpen(false);
				setLocationName('');
			});
	};

	if (isLoading || isFetching) {
		return <Loader />;
	}

	return (
		<>
			<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
				<div className='w-full flex justify-between'>
					<div className='text-xl'>
						Количество локации: {data?.locations.length}
					</div>
					<div className='w-72'>
						<Button
							onClick={() => navigation('/location/create')}
							styles='default'>
							Добавить локацию
						</Button>
					</div>
				</div>
				<main className='w-full'>
					<Table
						columns={cols}
						data={data?.locations as any[]}
					/>
				</main>
			</main>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<div className='w-96'>
						<Input
							input_size='medium'
							placeholder='Название'
							label='Название'
							onChange={(e) => setLocationName(e.target.value)}
							defaultValue={rowData?.name}
						/>
						<div className='w-full'>
							<Button
								styles='default'
								onClick={() => {
									handleEdit((rowData as ILocationModel).id!);
								}}>
								Изменить
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}
