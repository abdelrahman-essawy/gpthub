export interface Message {
  id: string;
  content: string;
  createdAt: Date;

  authorId: string;
  roomId: string;
}
