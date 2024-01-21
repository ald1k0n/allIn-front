import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface IProps {
	images?: string[];
	components?: JSX.Element[];
}

export const Slider: FC<IProps> = ({ images, components }) => {
	return (
		<div className='bg-black z-50 bg-opacity-50 fixed top-0 w-full min-h-screen flex justify-center items-center'>
			<Swiper
				// modules={[Navigation, Pagination]}
				// navigation
				spaceBetween={50}
				slidesPerView={1}>
				{images ? (
					images?.map((image, idx) => (
						<SwiperSlide
							className='flex justify-center items-center'
							key={idx}>
							<img
								src={image}
								alt=''
							/>
						</SwiperSlide>
					))
				) : components ? (
					components.map((component, idx) => (
						<SwiperSlide
							className='flex justify-center items-center'
							key={idx}>
							{component}
						</SwiperSlide>
					))
				) : (
					<div className='bg-white'>No any data provided to slide</div>
				)}
			</Swiper>
		</div>
	);
};
