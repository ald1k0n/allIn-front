import { useParams } from 'react-router-dom';

import { useGetProfilesQuery } from '@/redux/services';
import { Loader, Card } from '@/components';

export default function UserProfiles() {
	const { id } = useParams();

	const { data: profiles, isLoading } = useGetProfilesQuery(Number(id));

	if (isLoading) {
		return <Loader />;
	}

	return (
		<main className='w-full p-3'>
			<div className='w-full flex gap-3'>
				<div className='border-r-2 border-gray-400 pr-3'>
					Общее количество профилей: {profiles?.profiles.length}{' '}
				</div>
				<div>Пользователя: {profiles?.profiles[0]?.user.name}</div>
			</div>

			<div className='w-full mt-2 p-2 flex gap-2.5 flex-wrap'>
				{profiles?.profiles?.map((profile) => (
					<Card key={profile.id}>
						<div className='w-28 h-20 md:h-28 md:w-36 flex flex-col'>
							<div className='w-full text-xs md:text-sm flex items-center flex-col'>
								<div>Имя профиля:</div>
								<div className='underline text-center'>{profile.name}</div>
							</div>

							<div className='w-full text-xs md:text-sm flex items-center flex-col'>
								<div>Описание:</div>
								<div className='underline text-center'>
									{profile.description}
								</div>
							</div>
						</div>

						<div className='w-full text-center text-xs md:text-sm'>
							Количество лайков: {profile.likes.length}
						</div>
					</Card>
				))}
			</div>
		</main>
	);
}
