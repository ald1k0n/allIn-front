import { useParams } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { FaComments } from 'react-icons/fa';

import { useGetProfilesQuery } from '@/redux/services';
import { Loader, Card } from '@/components';
import { useAppSelector } from '@/hooks';

export default function UserProfiles() {
	const { id } = useParams();
	const { userProfileName } = useAppSelector((state) => state.interaction);

	const { data: profiles, isLoading } = useGetProfilesQuery(Number(id));

	if (isLoading) {
		return <Loader />;
	}

	if (profiles?.profiles.length === 0) {
		return <div className='w-full text-center'>Профили не найдены</div>;
	} else
		return (
			<main className='w-full p-3'>
				<div className='w-full flex gap-3'>
					<div className='border-r-2 border-gray-400 pr-3'>
						Общее количество профилей: {profiles?.profiles.length}{' '}
					</div>
					<div>Пользователя: {userProfileName}</div>
				</div>

				<div className='w-full mt-2 p-2 flex gap-2.5 flex-wrap'>
					{profiles?.profiles?.map((profile) => (
						<Card key={profile.id}>
							<div className='w-28 h-20 md:h-32 md:w-36 flex flex-col'>
								<div className='w-full text-xs md:text-sm flex items-center flex-col'>
									<div>Имя профиля:</div>
									<div className='underline text-center'>{profile.name}</div>
								</div>

								<div className='w-full text-xs md:text-sm flex items-center flex-col'>
									<div>Описание:</div>
									<div className='underline text-center'>
										{profile.description.length >= 30
											? profile.description.substring(0, 30) + '...'
											: profile.description}
									</div>
								</div>
							</div>

							<div className='w-full text-center text-xs md:text-sm flex justify-center items-center gap-0.5'>
								Лайки <FcLike />: {profile.likes.length}
							</div>
							<div className='w-full text-center text-xs md:text-sm flex justify-center items-center gap-0.5'>
								Комментарий <FaComments />: {profile.comments.length}
							</div>
						</Card>
					))}
				</div>
			</main>
		);
}
