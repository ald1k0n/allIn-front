import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IChatTypeModel} from "@/models/chats/chat-type.model.ts";
import {useCreateChatTypeMutation} from "@/redux/services";
import {toast} from "react-hot-toast";
import {Button, Input, Modal} from "@/components";

export default function ChatTypeCreate() {
    const [isOpen, setIsOpen] = useState(true);
	const [chatTypeData, setChatTypeData] = useState<IChatTypeModel | null>(null);
	const navigate = useNavigate();
    console.log(chatTypeData)

	useEffect(() => {
		if (!isOpen) navigate('/categories');
	}, [isOpen, navigate]);

    const [createChatType] = useCreateChatTypeMutation();

    const handleSubmit = async () => {
		await toast
			.promise(createChatType(chatTypeData).unwrap(), {
				success: 'Пользователь успешно создан',
				error: (err) => JSON.stringify(err, null, 2),
				loading: 'Загрузка...',
			})
			.finally(() => navigate('/categories'));
	};

    return (
		<Modal setIsOpen={setIsOpen}>
			<div className='w-80 flex flex-col gap-y-2'>
				<Input
					label='Название'
					placeholder='Название'
					input_size='large'
					onChange={(e) =>
						setChatTypeData((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
				/>

				<Button
					styles='default'
					onClick={handleSubmit}>
					Создать
				</Button>
			</div>
		</Modal>
	);
}