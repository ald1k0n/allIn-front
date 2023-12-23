import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';

const Home = lazy(() => import('./pages/Home'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: '/chats',
		element: (
			<Layout>
				<>Chats</>
			</Layout>
		),
	},
	{
		path: '/business',
		element: (
			<Layout>
				<>Business</>
			</Layout>
		),
	},
]);

export default function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={router} />
		</Suspense>
	);
}
