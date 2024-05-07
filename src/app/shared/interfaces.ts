
export interface IChatPreview {
  chatId: number;
  name: string;
  otherMember: IUser,
  lastMessage: string;
  lastMessageTimestamp: Date;
}
// export interface IChat {
//   chatId: number;
//   name: string;
//   members: IUser[];
//   messages: IMessage[];
// }

export interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  pic: string;
}

export interface IMessage {
  messageId: number;
  chatId: number;
  content: string;
  userId: number;
  timestamp?: string;
  seen?: boolean;
  deleted?: boolean;
}


export interface IMessageCreate {
  content: string;
  userId: number;
  chatId: number;
   timestamp: Date;
}


