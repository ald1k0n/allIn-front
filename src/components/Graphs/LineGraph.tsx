import { Line } from 'react-chartjs-2';
import { FC } from 'react';

interface IData {
	label: string;
	data: number[];
	borderColor: string;
	backgroundColor: string;
}

interface IProps {
	labels: string[];
	data: IData[];
}

export const LineGraph: FC<IProps> = ({ labels = [], data = [] }) => {
	const dataset = {
		labels,
		datasets: data,
	};

	const options = {
		responsive: true,

		scales: {
			y: {
				beginAtZero: true,
				stepSize: 1,
			},
		},
	};

	return (
		<Line
			options={options}
			data={dataset}
		/>
	);
};
