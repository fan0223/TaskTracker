import { Subjects } from "./subjects";

export interface Comment_TodoDeletedEvent {
  subject: Subjects.Comment_TodoDeleted,
  data: {
    id: string,
    userId: string
  }
}