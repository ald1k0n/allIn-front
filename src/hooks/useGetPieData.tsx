import { useGetUsersQuery } from '@/redux/services';
import { useEffect, useState } from 'react';

const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

interface Data {
	labels: string[];
	data: number[];
	colors: string[];
}

export const useGetPieData = () => {
	const { data, isLoading } = useGetUsersQuery();

	const [pieData, setPieData] = useState<Data>({
		labels: [],
		data: [],
		colors: [],
	});

	useEffect(() => {
		if (!isLoading) {
			const pieLabels = Array.from(
				new Set(
					data?.data?.map((user: any) => {
						if (user?.location?.name) {
							return user?.location?.name;
						} else {
							return 'Локация не указана';
						}
					})
				)
			) as string[];

			const pieUsersCount = pieLabels.map((label) => {
				const count = data?.data?.filter((user: any) => {
					if (user?.location?.name) {
						return user.location.name === label;
					} else {
						return label === 'Локация не указана';
					}
				}).length;

				return count || 0;
			});

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const pieUsersColor = pieLabels.map((_) => getRandomColor());

			setPieData({
				data: pieUsersCount,
				labels: pieLabels,
				colors: pieUsersColor,
			});
		}
		return () => {
			setPieData({
				labels: [],
				data: [],
				colors: [],
			});
		};
	}, [data, isLoading]);

	return { pieData };
};
