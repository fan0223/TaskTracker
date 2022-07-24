import { Subjects } from "./subjects";
export interface CommentCreatedEvent {
  subject: Subjects.CommentCreated,
  data: {
    id: string,
    userId: string,
    createdAt: string,
    content: string
  }
}