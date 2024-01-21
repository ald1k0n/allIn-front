import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { toast } from 'react-hot-toast';

import {
	useGetSubchatByChatIdQuery,
	useDeleteSubchatMutation,
	useCreateSubchatMutation,
} from '@/redux/services';
import { Loader, Modal } from '@/components';

export default function SubChats() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(true);
	const [subChatId, setSubChatId] = useState<number | null>(null);
	const [subChatName, setSubChatName] = useState('');
	const [isCreate, setIsCreate] = useState(false);

	const { data, isLoading } = useGetSubchatByChatIdQuery(Number(id));
	const [deleteSubchat] = useDeleteSubchatMutation();
	const [createSubchat] = useCreateSubchatMutation();

	useEffect(() => {
		if (!isOpen) navigate(-1);
	}, [isOpen, navigate]);

	if (isLoading) {
		return <Loader />;
	}

	const handleDelete = async (id: number) => {
		await toast.promise(deleteSubchat(id).unwrap(), {
			error: (err) => JSON.stringify(err, null, 2),
			loading: 'Загрузка...',
			success: 'Успешно удален под-чат',
		});
	};

	const editSubchat = async (id: number, chat_id: number) => {
		const editSub = new Promise<void>(async (resolve, reject) => {
			try {
				await Promise.all([
					deleteSubchat(id),
					createSubchat({ chat_id, title: subChatName }),
				]);
				resolve();
			} catch (error) {
				reject(error);
			}
		});

		await toast.promise(editSub, {
			error: (err) => JSON.stringify(err, null, 2),
			loading: 'Загрузка...',
			success: 'Успешно изменен под-чат',
		});
	};

	const handleCreate = async () => {
		await toast
			.promise(
				createSubchat({
					title: subChatName,
					chat_id: Number(id),
				}).unwrap(),
				{
					error: (err) => JSON.stringify(err, null, 2),
					loading: 'Загрузка...',
					success: 'Успешно создан под-чат',
				}
			)
			.finally(() => {
				setIsCreate(false);
				setSubChatName('');
			});
	};

	return (
		<Modal setIsOpen={setIsOpen}>
			<div className='w-full'>
				<div className='text-lg my-2 font-medium flex justify-between'>
					<div>Подчаты:</div>
					<button
						onClick={() => setIsCreate((prev) => !prev)}
						className='text-white text-sm bg-primary px-1 py-0.5 rounded-xl'>
						Создать
					</button>
				</div>
				<div className='w-64 max-h-64 overflow-auto'>
					{isCreate && (
						<div className='w-full flex justify-between items-center'>
							<input
								className='border focus:outline-none'
								placeholder='Название'
								defaultValue={subChatName}
								onChange={(e) => setSubChatName(e.target.value)}
							/>
							<button
								title='Сохранить'
								onClick={handleCreate}
								className='w-6 h-6 bg-green-500 text-white flex justify-center items-center rounded-full'>
								<MdSave />
							</button>
						</div>
					)}
					{data?.subChats.map((sub) => (
						<div
							className='w-full flex justify-between items-center'
							key={sub.id}>
							{subChatId === sub.id ? (
								<input
									className='border focus:outline-none'
									placeholder='Название'
									defaultValue={subChatName}
									onChange={(e) => setSubChatName(e.target.value)}
								/>
							) : (
								<div>{sub.title}</div>
							)}

							<div className='flex w-18 gap-1.5 p-1.5'>
								{subChatId === sub.id ? (
									<button
										title='Сохранить'
										onClick={() => editSubchat(sub.id!, sub.chat_id)}
										className='w-6 h-6 bg-green-500 text-white flex justify-center items-center rounded-full'>
										<MdSave />
									</button>
								) : (
									<button
										className='w-6 h-6 text-white bg-blue-400 flex justify-center items-center rounded-full'
										title='Изменить'
										onClick={() => {
											setSubChatId(sub.id!);
											setSubChatName(sub.title);
										}}>
										<MdEdit />
									</button>
								)}
								<button
									title='Удалить'
									className='w-6 h-6 bg-red-500 text-white flex justify-center items-center rounded-full'
									onClick={() => handleDelete(sub.id!)}>
									<MdDelete />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
}
