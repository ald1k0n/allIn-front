export interface IUser {
	id?: number;
	phone?: string;
	name?: string;
	role?: string;
	avatar?: string;
	createdAt?: string;
	location_id?: number;
	device_token?: string;
}

export interface ILogin {
	phone: string;
	code?: string;
	device_token?: string;
}
