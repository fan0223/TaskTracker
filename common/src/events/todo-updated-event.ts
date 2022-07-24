import { Subjects } from "./subjects";

export interface TodoUpdatedEvent {
  subject: Subjects.TodoUpdated,
  data: {
    id: string,
    title: string,
    content: string
  }
}