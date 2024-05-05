import { Message } from "../message/message.model";

export class Conversation {
  id: number;
  userId: number;
  timestamp: Date;
  messages: Message[];
}
