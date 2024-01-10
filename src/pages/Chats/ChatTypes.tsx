import {useState} from "react";
import {IChatTypeModel} from "@/models/chats/chat-type.model.ts";
import {
	useDeleteChatTypeMutation,
	useGetChatTypeQuery,
	useUpdateChatTypeMutation
} from "@/redux/services";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import {Button, Input, Loader, Modal, Table} from "@/components";
import {toast} from "react-hot-toast";

export default function ChatTypes() {
    const [isOpen, setIsOpen] = useState(false);
	const [rowData, setRowData] = useState<IChatTypeModel>();
	const [chatType, setChatType] = useState(rowData);

    const { data: chatTypes, isLoading: isLoadingChatTypes } = useGetChatTypeQuery();
	const [updateChatType] = useUpdateChatTypeMutation();
	const [deleteChatType] = useDeleteChatTypeMutation();

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
			header: 'Редактируемое',
			accessorKey: 'isEditable',
		},
		{
			header: 'Дата создания',
			accessorKey: 'createdAt',
			cell: ({ row }: { row: { original: IChatTypeModel } }) => {
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
			cell: ({ row }: { row: { original: IChatTypeModel } }) => {
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
			cell: ({ row }: { row: { original: IChatTypeModel } }) => {
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
			...chatType,
			id: rowData?.id,
		};

		await toast
			.promise(updateChatType(values).unwrap(), {
				success: 'Успешно обновлена категория',
				loading: 'Загрузка...',
				error: (err) => JSON.stringify(err, null, 2),
			})
			.finally(() => setIsOpen(false));
	};

	const handleDelete = async (id: number) => {
		await toast.promise(deleteChatType(id).unwrap(), {
			success: 'Успешно удалена категория',
			loading: 'Загрузка...',
			error: (err) => JSON.stringify(err, null, 2),
		});
	};

	if (isLoadingChatTypes) {
		return <Loader />;
	}

	return (
		<>
			<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
				<div className='w-full flex justify-end'>
					<Link to='/categories/create'>
						<Button styles='default'>Создать категорию</Button>
					</Link>
				</div>
				<Table
					columns={cols}
					data={chatTypes?.chatTypes as IChatTypeModel[]}
				/>
			</main>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<div className='p-3 flex flex-col gap-y-1 w-80'>
						<div className='text-center text-lg'>
							Название {rowData?.title}
						</div>
						<Input
							input_size={'medium'}
							defaultValue={rowData?.title}
							value={chatType?.title}
							onChange={(e) => setChatType({ ...chatType, title: e.target.value })}
							type='text'
							placeholder={'Название'}
							label={'Название'}
						/>

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