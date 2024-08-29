export interface IMessage {
  id: number;
  chatId: string;
  content: string;
  sender: string;
  time_stamp: Date;
}
