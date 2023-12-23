import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

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
	{
		path: '/login',
		element: <Login />,
	},
]);

export default function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={router} />
			<Toaster position='top-right' />
		</Suspense>
	);
}
