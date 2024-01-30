import { IUser } from '@/models/users/user.model.ts';
import { IChatModel } from '@/models/chats/chat.model.ts';
import { IProfileModel } from '@/models/users/profile.model.ts';
import { IMessageModel } from '@/models/message.model.ts';
import { ICommentModel } from '@/models/users_reaction/comment.model.ts';

export interface IComplaintModel {
	id?: number;
	text: string;
	userId?: number;
	user: IUser;
	entityType: string;
	messageId?: number;
	message: IMessageModel;
	chatId?: number;
	chat: IChatModel;
	profileId?: number;
	profile: IProfileModel;
	commentId?: number;
	comment: ICommentModel;
	targetId?: number;
	target?: IUser;
	createdAt?: string;
}
