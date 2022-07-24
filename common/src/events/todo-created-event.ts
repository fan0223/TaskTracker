import { Subjects } from "./subjects";

export interface TodoCreatedEvent {
  subject: Subjects.TodoCreated,
  data: {
    id: string,
    title: string,
    content: string,
    userId: string,
    userEmail: string,
    createdAt: string
  }
}