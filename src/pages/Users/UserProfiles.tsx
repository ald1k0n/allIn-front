import { useParams, useNavigate } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { FaComments } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

import { useState, useEffect } from 'react';

import { useGetProfilesQuery } from '@/redux/services';
import { Loader, Slider, Modal } from '@/components';

export default function UserProfiles() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		if (!isOpen) navigate(-1);
	}, [isOpen, navigate]);

	const { data: profiles, isLoading } = useGetProfilesQuery(Number(id));

	if (isLoading) {
		return <Loader />;
	}

	const profilesArray = profiles?.profiles.map((profile) => (
		<div
			className='w-2/3 p-3 bg-white rounded-md flex flex-col justify-between'
			key={profile.id}>
			<div className='w-full flex justify-end border-b-2 py-0.5'>
				<RxCross1
					className='hover:text-blue-600 cursor-pointer'
					onClick={() => navigate('/users')}
				/>
			</div>
			<div className='flex justify-between items-center text-xl font-medium'>
				<h1>{profile.name}</h1>
				<div>
					<div className='flex'>
						{profile.likes.length} <FcLike />
					</div>
					<div className='flex'>
						{profile.comments.length} <FaComments />
					</div>
				</div>
			</div>
			<hr />

			<div className='w-full flex justify-center'>
				<pre className='font-nunito overflow-auto w-full max-h-64'>
					{profile.description}
				</pre>
			</div>
			<hr />
			{(profile?.additional_photos as string).length > 0 && (
				<div
					onClick={() => {
						navigate(`/users/${id}/images`, {
							state: {
								images: profile?.additional_photos,
							},
						});
					}}
					className='text-center cursor-pointer hover:text-blue-600 hover:underline'>
					Картинки
				</div>
			)}
		</div>
	));

	if (profiles?.profiles.length === 0) {
		return <Modal setIsOpen={setIsOpen}>Бизнес страницы не найдены</Modal>;
	} else return <Slider components={profilesArray} />;
}
