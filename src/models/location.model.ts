import { IUser } from './users/user.model.ts';

export interface ILocationModel {
	id?: number;
	name: string;
	user?: IUser;
}
