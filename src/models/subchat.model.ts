import { IChatModel } from './chat.model.ts';

export interface ISubChatModel {
	id?: number;
	title: string;
	chat_id: number;
	chat: IChatModel;
}
