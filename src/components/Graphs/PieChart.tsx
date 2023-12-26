import { FC } from 'react';
import { Pie } from 'react-chartjs-2';

interface IProps {
	labels: string[];
	label: string;
	backgroundColor: string[];
	borderColor: string[];
	data: number[];
}

export const PieChart: FC<IProps> = ({
	labels,
	backgroundColor,
	borderColor,
	data,
	label,
}) => {
	const dataset = {
		labels,
		datasets: [{ label, data, backgroundColor, borderColor, borderWidth: 1 }],
	};

	return <Pie data={dataset} />;
};
