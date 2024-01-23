import {IUser} from "@/models/users/user.model.ts";
import {ISubChatModel} from "@/models/chats/subchat.model.ts";
import {ILocationModel} from "@/models/location.model.ts";

export interface IMessageModel {
    id?: number,
    text: string,
    photo: string,
    isRead: boolean,
    userId?: number,
    user: IUser,
    subChatId?: number,
    subChat: ISubChatModel,
    locationId: number,
    location: ILocationModel
}