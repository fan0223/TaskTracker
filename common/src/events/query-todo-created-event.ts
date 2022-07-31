import { Subjects } from "./subjects";

export interface Query_TodoCreatedEvent {
  subject: Subjects.Query_TodoCreated,
  data: {
    id: string,
    title: string,
    content: string,
    userId: string,
    userEmail: string,
    createdAt: string
  }
}