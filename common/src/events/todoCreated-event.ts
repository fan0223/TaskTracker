import { Subjects } from "./subjects";

export interface TodoCreatedEvent {
  subject: TodoCreatedEvent,
  data: {
    id: string,
    title: string,
    content: string,
    userId: string,
    userEmail: string,
    createdAt: string,
    imageName: string,
    imageUrl: string
  }
}