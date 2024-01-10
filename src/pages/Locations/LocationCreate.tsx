import {useEffect, useState} from "react";
import {ILocationModel} from "@/models/location.model.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {useCreateLocationMutation} from "@/redux/services";
import {Button, Input, Modal} from "@/components";

export default function LocationCreate() {
    const [isOpen, setIsOpen] = useState(true);
    const [locationData, setLocationData] = useState<ILocationModel | null>(null);
    
    const [createLocation] = useCreateLocationMutation();

    const navigate = useNavigate();

    useEffect(() => {
		if (!isOpen) navigate('/locations');
	}, [isOpen, navigate]);
    
    const handleSubmit = async () => {
		await toast
			.promise(createLocation(locationData).unwrap(), {
				success: 'Успешно создана локация',
				error: (err) => JSON.stringify(err, null, 2),
				loading: 'Загрузка...',
			})
			.finally(() => navigate('/chats'));
	};

    return (
        <Modal setIsOpen={setIsOpen}>
			<div className='p-3 flex flex-col gap-y-1.5 w-80'>
				<div className='text-center text-xl'>Создать локацию!</div>
				<Input
					label='Название локацию'
					input_size='medium'
					placeholder='Локация'
					onChange={(e) =>
						setLocationData((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
				/>
				<Button
					onClick={handleSubmit}
					styles='default'>
					Создать локацию!
				</Button>
			</div>
		</Modal>
    );
}