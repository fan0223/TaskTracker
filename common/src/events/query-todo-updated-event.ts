import { Subjects } from "./subjects";

export interface Query_TodoUpdatedEvent {
  subject: Subjects.Query_TodoUpdated,
  data: {
    id: string,
    title: string,
    content: string
  }
}