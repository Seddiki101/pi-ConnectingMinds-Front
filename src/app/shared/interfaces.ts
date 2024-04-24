
export interface IChatPreview {
  chatId: number;
  name: string;
  otherMemberId: number,
  lastMessage: string;
  lastMessageTimestamp: Date;
}
export interface IChat {
  chatId: number;
  name: string;
  members: IUser[];
  messages: IMessage[];
}

export interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IMessage {
  messageId: number;
  content: string;
  timestamp: Date;
  lastSeen: boolean;
  deleted: boolean;
  user: IUser;
  chat: IChat | null;
}

export interface IMessageCreate {
  content: string;
  userId: number;
  chatId: number;
}


