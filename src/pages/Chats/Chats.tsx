import { Table, Loader } from '@/components';
import {
	useLazyGetSavedChatsQuery,
	useLazyGetSubscribedChatsQuery,
	useGetChatsQuery,
} from '@/redux/services';

export default function Chats() {
	const { data: chats, isLoading } = useGetChatsQuery();
	const [getSavedChats, { isLoading: isSaved }] = useLazyGetSavedChatsQuery();
	const [getSubChats, { isLoading: isSub }] = useLazyGetSubscribedChatsQuery();

	if (isLoading) return <Loader />;

	return (
		<main className='w-full flex gap-y-4 gap-4 justify-center md:justify-normal flex-wrap'>
			Chats
		</main>
	);
}
