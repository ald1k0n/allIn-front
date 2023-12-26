import { useGetUsersQuery } from '@/redux/services/users.service';
import { Card, Loader } from '@/components';

export default function Home() {
	const { data, isLoading } = useGetUsersQuery();

	return (
		<main className='w-full flex flex-wrap'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Card>Общее количество пользователей {data?.users.length}</Card>
				</>
			)}
		</main>
	);
}
