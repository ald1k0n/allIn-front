import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '@/components/UI/Layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getMe } from '@/redux/slices/user.slice';
import { Loader } from '@/components';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Users = lazy(() => import('@/pages/Users/Users'));
const UserProfiles = lazy(() => import('@/pages/Users/UserProfiles'));
const UserCreate = lazy(() => import('@/pages/Users/UserCreate'));
const Chats = lazy(() => import('@/pages/Chats/Chats'));
const ChatCreate = lazy(() => import('@/pages/Chats/ChatCreate'));
const LocationCreate = lazy(() => import('@/pages/Locations/LocationCreate'));
const ChatTypes = lazy(() => import('@/pages/Chats/ChatTypes.tsx'));
const ChatTypeCreate = lazy(() => import('@/pages/Chats/ChatTypeCreate.tsx'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const UserProfileImages = lazy(() => import('@/pages/Users/UserProfileImages'));

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
				<Outlet />
				<Chats />
			</Layout>
		),
		children: [
			{
				path: '/chats/location/create',
				element: <LocationCreate />,
			},
			{
				path: '/chats/create',
				element: <ChatCreate />,
			},
		],
	},

	{
		path: '/users',
		element: (
			<>
				<Outlet />
				<Layout>
					<Users />
				</Layout>
			</>
		),
		children: [
			{
				path: '/users/:id',
				element: <UserProfiles />,
			},
			{
				path: '/users/create',
				element: <UserCreate />,
			},
			{
				path: '/users/:id/images',
				element: <UserProfileImages />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/categories',
		element: (
			<Layout>
				<Outlet />
				<ChatTypes />
			</Layout>
		),
		children: [
			{
				path: '/categories/create',
				element: <ChatTypeCreate />,
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
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
