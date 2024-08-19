export interface IMessage {
  id: number;
  chatId: number;
  content: string;
  sender: string;
  time_stamp: Date;
}
