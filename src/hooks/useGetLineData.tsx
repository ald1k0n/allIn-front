import { useGetUsersQuery } from '@/redux/services';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

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

export const useGetLineData = () => {
	const { data: usersData, isLoading } = useGetUsersQuery();
	const [data, setData] = useState<Data>({
		data: [],
		labels: [],
	});
	useEffect(() => {
		if (!isLoading) {
			const labels = usersData?.data?.map((user) =>
				format(new Date(user.createdAt!), 'dd/MM/yyyy')
			);

			const counts = labels?.reduce((acc: any, label) => {
				acc[label] = (acc[label] || 0) + 1;
				return acc;
			}, {});
			setData((prev) => ({
				...prev,
				labels: Object.keys(counts || {}).reverse(),
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
		}
	}, [isLoading, usersData]);

	return { userData: data };
};
