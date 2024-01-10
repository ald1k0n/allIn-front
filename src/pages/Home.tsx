import { Card, Loader, LineGraph, PieChart } from '@/components';
import { useGetUsersQuery, useGetChatsQuery } from '@/redux/services';
import { useGetLineData, useGetPieData } from '@/hooks';

export default function Home() {
	const { data: usersData, isLoading: isUserLoading } = useGetUsersQuery();
	const { data: chatData, isLoading: isChatLoading } = useGetChatsQuery();

	const { pieData } = useGetPieData();
	const { userData } = useGetLineData();

	return (
		<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
			{isUserLoading ? (
				<Loader />
			) : (
				<>
					<section className='flex h-full gap-2 flex-col gap-y-4 flex-wrap'>
						<section className='flex h-full gap-2 gap-y-4 flex-wrap'>
							<Card>
								<div className='flex flex-col justify-between items-center h-22'>
									<div className='text-center text-lg'>
										Общее количество пользователей:
									</div>
									<div className='text-3xl'>{usersData?.count}</div>
								</div>
							</Card>
						</section>

						<section className='flex h-full gap-2 justify-center gap-y-4 flex-wrap'>
							{isChatLoading ? (
								<Loader />
							) : (
								<Card>
									<div className='flex flex-col justify-between items-center h-22'>
										<div className='text-center text-lg'>
											Количество созданных чатов:
										</div>
										<div className='text-3xl'>{chatData?.count}</div>
									</div>
								</Card>
							)}
						</section>
					</section>

					<Card>
						<div className='flex w-72 md:w-96 flex-col h-56'>
							<div className='w-full text-lg text-center'>
								Пользователи по периоду:
							</div>
							<div className='w-full h-full'>
								<LineGraph
									data={userData.data!}
									labels={userData.labels}
								/>
							</div>
						</div>
					</Card>

					<Card>
						<div className='flex w-72  flex-col h-80'>
							<div className='w-full text-lg text-center'>
								Пользователи по локациям:
							</div>
							<div className='w-full h-full'>
								<PieChart
									data={pieData.data}
									labels={pieData.labels}
									label='Локации'
									backgroundColor={pieData.colors}
									borderColor={pieData.colors}
								/>
							</div>
						</div>
					</Card>
				</>
			)}
		</main>
	);
}
