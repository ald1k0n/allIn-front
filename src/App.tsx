import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '@/components/UI/Layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getMe } from '@/redux/slices/user.slice';
import { Loader } from '@/components';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
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
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (!user) {
			dispatch(getMe());
		}
	}, [user, dispatch]);

	return (
		<Suspense
			fallback={
				<div className='w-full h-screen flex justify-center items-center'>
					<Loader />
				</div>
			}>
			<RouterProvider router={router} />
			<Toaster position='top-right' />
		</Suspense>
	);
}
