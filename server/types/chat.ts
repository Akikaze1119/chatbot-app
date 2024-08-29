export interface IChat {
  id: string;
  userId: string;
  score: number;
  location: string | null;
  time_stamp: Date;
}
