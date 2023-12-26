import { IUser } from './user.model.ts';
import { ICommentModel } from './comment.model.ts';
import { ILikeModel } from './like.model.ts';

export interface IProfileModel {
	id?: number;
	name: string;
	description: string;
	main_photo?: string;
	additional_photos?: string;
	user_id: number;
	user: IUser;
	comments: ICommentModel[];
	likes: ILikeModel[];
}
