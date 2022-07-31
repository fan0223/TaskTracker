import { Subjects } from "./subjects";

export interface Comment_TodoCreatedEvent {
  subject: Subjects.Comment_TodoCreated,
  data: {
    id: string,
    title: string,
    content: string,
    userId: string,
    userEmail: string,
    createdAt: string
  }
}