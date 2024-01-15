import { IUser } from '../users/user.model.ts';
import { IChatTypeModel } from './chat-type.model.ts';
import { ILocationModel } from '../location.model.ts';
import { ISubChatModel } from './subchat.model.ts';
export interface IChatModel {
	id?: number;
	title: string;
	photo?: string;
	user_id?: number;
	user?: IUser;
	type_id?: number;
	type?: IChatTypeModel;
	location_id?: number;
	location?: ILocationModel;
	sub_chats?: ISubChatModel[];
	isPersonal?: boolean;
	isChatPinned?: boolean;
}

export const ChatCategories: { [index: string]: string } = {
	Личные: 'personal',
	Сохранённые: 'saved',
	Чаты: 'subscribe',
	История: 'history',
};
