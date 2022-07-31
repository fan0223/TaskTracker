import { Subjects } from "./subjects";

export interface Query_TodoDeletedEvent {
  subject: Subjects.Query_TodoDeleted,
  data: {
    id: string,
    userId: string
  }
}