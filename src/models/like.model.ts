import { IProfileModel } from './profile.model.ts';
import { IUser } from './user.model.ts';

export interface ILikeModel {
	user_id: number;
	profile_id: number;
	profile: IProfileModel;
	user: IUser;
}
