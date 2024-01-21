import { useLocation, useNavigate } from 'react-router-dom';
import { Slider } from '@/components';

export default function UserProfileImages() {
	const location = useLocation();
	const navigate = useNavigate();

	const imagesArray = (location.state?.images as string[]).map((image, idx) => (
		<div
			key={idx}
			className='p-3 flex w-96 h-96 flex-col bg-white'>
			<div
				onClick={() => navigate(-1)}
				className='flex cursor-pointer'>
				Вернуться назад
			</div>
			<img
				src={image}
				alt='image'
				className='w-full h-full object-cover'
			/>
		</div>
	));

	return <Slider components={imagesArray} />;
}
