import { IUser } from './user.model.ts';

export interface ILocationModel {
	id?: number;
	name: string;
	user: IUser;
}
