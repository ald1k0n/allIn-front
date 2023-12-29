import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { Card, Loader, LineGraph } from '@/components';
import { useGetUsersQuery, useGetChatsQuery } from '@/redux/services';

interface Data {
	labels: string[];
	data:
		| {
				data: number[];
				label: string;
				borderColor: string;
				backgroundColor: string;
		  }[]
		| null;
}
export default function Home() {
	const { data: usersData, isLoading: isUserLoading } = useGetUsersQuery();
	const { data: chatData, isLoading: isChatLoading } = useGetChatsQuery();

	const [data, setData] = useState<Data>({
		data: [],
		labels: [],
	});

	useEffect(() => {
		const labels = usersData?.data?.map((user) =>
			format(new Date(user.createdAt), 'dd/MM/yyyy')
		);

		const counts = labels?.reduce((acc: any, label) => {
			acc[label] = (acc[label] || 0) + 1;
			return acc;
		}, {});

		setData((prev) => ({
			...prev,
			labels: Object.keys(counts || {}),
			data: [
				{
					data: Object.values(counts || {}),
					label: 'Кол. зарегистрированных',
					borderColor: '#d1001f',
					backgroundColor: '#ff2c2c',
				},
			],
		}));
		return () => {
			setData({
				data: [],
				labels: [],
			});
		};
	}, [usersData]);

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
										<div className='text-3xl'>{chatData?.chats.length}</div>
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
									data={data.data!}
									labels={data.labels}
								/>
							</div>
						</div>
					</Card>
				</>
			)}
		</main>
	);
}
