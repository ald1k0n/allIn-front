import { IProfileModel } from './profile.model.ts';
import { IUser } from './user.model.ts';

export interface ICommentModel {
	id?: number;
	text: string;
	profile_id: number;
	profile: IProfileModel;
	user_id: number;
	user: IUser;
}
