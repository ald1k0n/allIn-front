import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

import { Button, Input, Loader, Modal, Table } from '@/components';
import { IComplaintModel } from '@/models/complaint.model.ts';
import {
	useDeleteComplaintMutation,
	useGetComplaintsQuery,
} from '@/redux/services/complaint.service.ts';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useUpdateUsersMutation } from '@/redux/services';
import { FaBan } from 'react-icons/fa';

export default function Complaints() {
	const [isOpen, setIsOpen] = useState(false);
	const [rowData, setRowData] = useState<IComplaintModel>();
	const [block, setBlock] = useState({
		blockHours: '',
		blockReason: '',
	});

	const {
		data: complaints,
		isLoading: isLoadingComplaints,
		refetch,
	} = useGetComplaintsQuery();
	const [deleteComplaint] = useDeleteComplaintMutation();

	const [updateUser] = useUpdateUsersMutation();

	const cols = [
		{
			header: 'id',
			accessorKey: 'id',
		},

		{
			header: 'Пользователь',
			cell: ({ row }: { row: { original: IComplaintModel } }) => {
				return (
					<div className='w-full flex justify-center'>
						{row.original.target?.name}
					</div>
				);
			},
		},
		{
			header: 'Тип жалобы',
			accessorKey: 'entity_type',
		},
		{
			header: 'Жалоба',
			accessorKey: 'text',
		},
		{
			header: 'Дата создания',
			accessorKey: 'createdAt',
			cell: ({ row }: { row: { original: IComplaintModel } }) => {
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
			cell: ({ row }: { row: { original: IComplaintModel } }) => {
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
			header: 'Забанить',
			cell: ({ row }: { row: { original: IComplaintModel } }) => {
				return (
					<div className='w-full flex justify-center'>
						<div
							onClick={() => {
								setRowData(row.original);
								setIsOpen(true);
							}}
							className='w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center'>
							<FaBan className='w-full text-center text-xl cursor-pointer text-white' />
						</div>
					</div>
				);
			},
		},
	];

	const handleDelete = async (id: number) => {
		await toast.promise(deleteComplaint(id).unwrap(), {
			success: 'Успешно удален пользователь',
			loading: 'Загрузка...',
			error: (err) => JSON.stringify(err, null, 2),
		});
	};

	const handleBan = async () => {
		const formData = new FormData();
		// console.log(rowData);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		formData.append('id', rowData?.target_id);
		formData.append('blockHours', block.blockHours);
		formData.append('blockReason', block.blockReason);

		await toast
			.promise(updateUser(formData).unwrap(), {
				success: 'Пользователь успешно забанен',
				loading: 'Загрузка...',
				error: (err) => JSON.stringify(err, null, 2),
			})
			.then(() => handleDelete((rowData as IComplaintModel).id!))
			.finally(() => {
				refetch();
				setBlock({
					blockHours: '',
					blockReason: '',
				});
			});
	};

	if (isLoadingComplaints) {
		return <Loader />;
	}
	// console.log(complaints?.complaints);
	return (
		<>
			<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
				<div className='w-full flex justify-between'>
					<div className='text-xl'>
						Количество жалоб {complaints?.complaints.length}
					</div>
				</div>
				<Table
					columns={cols}
					data={
						complaints?.complaints
							.slice()
							.sort(
								(a, b) => (a?.id as number) - (b?.id as number)
							) as IComplaintModel[]
					}
				/>
			</main>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<div className='p-3 flex flex-col gap-y-4 w-80'>
						<div className='text-center text-lg'>
							Пользователь {rowData?.target?.name}
						</div>
						<Input
							input_size={'medium'}
							defaultValue={block.blockHours}
							value={block.blockHours}
							onChange={(e) => {
								setBlock((prev) => {
									if (
										Number(e.target.value) >= 0 &&
										Number(e.target.value) <= 100
									) {
										return { ...prev, blockHours: e.target.value };
									}
									return prev;
								});
							}}
							type='number'
							placeholder={'Количество часов'}
							label={'Количество часов'}
						/>

						<Input
							input_size={'medium'}
							defaultValue={block.blockReason}
							value={block.blockReason}
							onChange={(e) =>
								setBlock((prev) => ({ ...prev, blockReason: e.target.value }))
							}
							type='text'
							placeholder={'Причина бана'}
							label={'Причина бана'}
						/>

						<Button
							styles={'default'}
							onClick={handleBan}>
							Отправить
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
}
