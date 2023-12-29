import {Table, Loader, Button, Modal, Input} from '@/components';
import {
	useLazyGetSavedChatsQuery,
	useLazyGetSubscribedChatsQuery,
	useGetChatsQuery, useUpdateChatMutation, useDeleteChatMutation,
} from '@/redux/services';
import {IUser} from "@/models";
import {IChatModel} from "@/models/chats/chat.model.ts";
import {format} from "date-fns";
import {toast} from "react-hot-toast";
import {useRef, useState} from "react";

export default function Chats() {
	const [isOpen, setIsOpen] = useState(false);
	const [rowData, setRowData] = useState<IChatModel>();
	const [chat, setChat] = useState(rowData);
	const [file, setFile] = useState(null);

	const { data: chats, isLoading } = useGetChatsQuery();
	const [getSavedChats, { isLoading: isSaved }] = useLazyGetSavedChatsQuery();
	const [getSubChats, { isLoading: isSub }] = useLazyGetSubscribedChatsQuery();
	const [updateChat] = useUpdateChatMutation();
	const [deleteChat] = useDeleteChatMutation();

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
			header: 'Photo',
			cell: ({ row }: { row: { original: IChatModel } }) => {
				return (
					<div className={"w-32 h-32"}>
						<img className="w-full h-full" src={row.original?.photo!} alt="Photo"/>
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
			// ...rowData,
			...chat,
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

	console.log(chats)

	return (
		<>
			<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
				<Table
					columns={cols}
					data={chats?.data as IChatModel[]}
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
