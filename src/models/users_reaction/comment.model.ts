import { IProfileModel } from '../users/profile.model.ts';
import { IUser } from '../users/user.model.ts';

export interface ICommentModel {
	id?: number;
	text: string;
	profile_id: number;
	profile: IProfileModel;
	user_id: number;
	user: IUser;
}
