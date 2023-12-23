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
	legend: string;
}

export const LineGraph: FC<IProps> = ({ labels, data, legend }) => {
	const dataset = {
		labels,
		datasets: data,
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: legend,
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
