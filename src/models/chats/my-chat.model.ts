import { IChatModel } from './chat.model.ts';
import { IUser } from '../users/user.model.ts';
import { ICategoryModel } from '../category.model.ts';

export interface IMyChatModel {
	id?: number;
	is_notification: boolean;
	chat_id: number;
	chat: IChatModel;
	user_id: number;
	user: IUser;
	category_id: number;
	category: ICategoryModel;
	receiver_id: number;
	receiver: IUser;
}
