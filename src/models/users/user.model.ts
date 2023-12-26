export interface IUser {
	id?: number;
	phone: string;
	name: string;
	role: string;
}

export interface ILogin {
	phone: string;
	code?: string;
	device_token?: string;
}
