import { Subjects } from "./subjects";
export interface CommentDeletedEvent {
  subject: Subjects.CommentDeleted,
  data: {
    id: string,
    userId: string,
    createdAt: string,
    content: string
  }
}