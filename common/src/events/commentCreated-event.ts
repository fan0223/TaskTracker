import { Subjects } from "./subjects";
export interface CommentCreatedEvent {
  subject: Subjects.CommentCreated,
  data: {
    id: string,
    todoId: string,
    userId: string,
    userName: string,
    createdAt: string,
    content: string
  }
}