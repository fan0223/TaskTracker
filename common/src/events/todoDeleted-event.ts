import { Subjects } from "./subjects";

export interface TodoDeletedEvent {
  subject: Subjects.TodoDeleted,
  data: {
    id: string,
    userId: string
  }
}