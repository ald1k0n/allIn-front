import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';
import ReactDOM from 'react-dom/client';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
