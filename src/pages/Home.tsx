import { useState, useEffect } from 'react';

import { useGetUsersQuery } from '@/redux/services/users/users.service';
import { Card, Loader, LineGraph } from '@/components';
import { format } from 'date-fns';

function getRandomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
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
	const { data: usersData, isLoading } = useGetUsersQuery();
	const [data, setData] = useState<Data>({
		data: [],
		labels: [],
	});
	// console.log(data?.users);

	useEffect(() => {
		const labels = usersData?.users?.map((user) =>
			format(new Date(user.createdAt), 'dd/mm/yyyy')
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
					borderColor: getRandomColor(),
					backgroundColor: getRandomColor(),
				},
			],
		}));
	}, [usersData]);

	return (
		<main className='w-full flex flex-wrap gap-2'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Card>Общее количество пользователей: {usersData?.users.length}</Card>
					<Card>
						<div className='w-full'>Пользователи по периоду:</div>
						<div className='w-full'>
							<LineGraph
								data={data.data!}
								legend='Периоды'
								labels={data.labels}
							/>
						</div>
					</Card>
				</>
			)}
		</main>
	);
}
