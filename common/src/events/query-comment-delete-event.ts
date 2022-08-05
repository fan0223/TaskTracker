import { Subjects } from "./subjects";
export interface Query_CommentDeletedEvent {
  subject: Subjects.Query_CommentDeleted,
  data: {
    id: string,
    todoId: string,
    userId: string,
    createdAt: string,
    content: string
  }
}