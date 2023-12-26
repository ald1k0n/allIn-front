import { IProfileModel } from '../users/profile.model.ts';
import { IUser } from '../users/user.model.ts';

export interface ILikeModel {
	user_id: number;
	profile_id: number;
	profile: IProfileModel;
	user: IUser;
}
