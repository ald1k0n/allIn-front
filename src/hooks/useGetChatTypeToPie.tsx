import { useEffect, useState } from 'react';

import { useGetChatsQuery, useGetChatTypeQuery } from '@/redux/services';

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

export const useGetChatTypeToPie = () => {
	const { data: chats, isLoading } = useGetChatsQuery({
		locationId: null,
		typeId: null,
	});
	const { data: chatTypes, isLoading: loadingChatTypes } =
		useGetChatTypeQuery();

	const [data, setData] = useState<Data | Array<any>>([]);
	useEffect(() => {
		if (!isLoading) {
			const typeCounts: any = {};

			chats?.data.forEach((chat) => {
				const type_id = chat.type_id !== null ? chat.type_id : 'Без типа';

				const typeEntry = chatTypes?.chatTypes.find(
					(entry) => entry.id === type_id
				);

				const title = typeEntry ? typeEntry.title : 'Без типа';

				typeCounts[title as string] = (typeCounts[title as string] || 0) + 1;
			});

			const labels = Object.keys(typeCounts);
			const data: number[] = Object.values(typeCounts);
			const colors = labels.map(() => getRandomColor());

			setData({
				colors,
				data,
				labels,
			});

			return () => {
				setData([]);
			};
		}
	}, [isLoading, chats, loadingChatTypes, chatTypes]);

	return { data };
};
