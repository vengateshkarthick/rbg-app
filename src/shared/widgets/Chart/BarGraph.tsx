import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface BarGraphProps {
    labels: string[];
    datasets: ChartData<'bar'>['datasets'];
    options?: ChartOptions<'bar'>;
}

export default function BarGraph(props: BarGraphProps) {
    const { labels, datasets, options } = props;

    const data: ChartData<'bar'> = {
        labels,
        datasets
    };

    return (
        <Bar data={data} options={options} />
    );
}