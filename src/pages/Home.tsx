/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Card, Loader, LineGraph, PieChart } from '@/components';
import { useGetUsersQuery, useGetChatsQuery } from '@/redux/services';
import { useGetChatTypeToPie, useGetLineData, useGetPieData } from '@/hooks';

export default function Home() {
	const { data: usersData, isLoading: isUserLoading } = useGetUsersQuery();
	const { data: chatData, isLoading: isChatLoading } = useGetChatsQuery();

	const { pieData } = useGetPieData();
	const { userData } = useGetLineData();
	const { data: typeChats } = useGetChatTypeToPie();

	return (
		<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
			{isUserLoading ? (
				<Loader />
			) : (
				<>
					<main className='w-auto h-full rounded-md p-4'>
						<div className='text-xl mb-2'>Статистика:</div>
						<section className='w-full h-full flex gap-2.5'>
							<div className='w-full flex gap-2 flex-col md:flex-row'>
								<Card>
									<div className='flex flex-col justify-between items-center h-16'>
										<div className='text-center text-lg'>
											Общее количество пользователей:
										</div>
										<div className='text-3xl'>{usersData?.count}</div>
									</div>
								</Card>

								{isChatLoading ? (
									<Loader />
								) : (
									<Card>
										<div className='flex flex-col justify-between items-center h-16'>
											<div className='text-center text-lg'>
												Количество созданных чатов:
											</div>
											<div className='text-3xl'>{chatData?.count}</div>
										</div>
									</Card>
								)}
							</div>
						</section>
					</main>

					<main className='w-auto h-full rounded-md p-4'>
						<div className='text-xl mb-2'>Графики:</div>
						<section className='w-full h-full flex gap-2.5'>
							<Card>
								<div className='flex w-72 md:w-96 flex-col h-80'>
									<div className='w-full text-lg text-center'>
										Пользователи по периоду:
									</div>
									<div className='w-full h-full flex items-center'>
										<LineGraph
											data={userData.data!}
											labels={userData.labels}
										/>
									</div>
								</div>
							</Card>

							<Card>
								<div className='flex w-72 flex-col h-80'>
									<div className='w-full text-base text-center'>
										Пользователи по местоположению:
									</div>
									<div className='w-full h-full'>
										<PieChart
											data={pieData.data}
											labels={pieData.labels}
											label='Местоположения'
											backgroundColor={pieData.colors}
											borderColor={pieData.colors}
										/>
									</div>
								</div>
							</Card>
							<Card>
								<div className='flex w-72  flex-col h-80'>
									<div className='w-full text-base text-center'>
										Чаты по типам:
									</div>
									<div className='w-full h-full'>
										<PieChart
											data={
												//@ts-ignore
												typeChats.data as any[]
											}
											labels={
												//@ts-ignore
												typeChats.labels as any[]
											}
											label='Чаты'
											backgroundColor={
												//@ts-ignore
												typeChats.colors as any[]
											}
											borderColor={
												//@ts-ignore
												typeChats.colors as any[]
											}
										/>
									</div>
								</div>
							</Card>
						</section>
					</main>
				</>
			)}
		</main>
	);
}
