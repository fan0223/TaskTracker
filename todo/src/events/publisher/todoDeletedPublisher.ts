import { CustomPublish, Subjects, TodoDeletedEvent } from '@fan-todo/common'


export class todoDeletedPublisher extends CustomPublish<TodoDeletedEvent>{
  channel: Subjects.TodoDeleted = Subjects.TodoDeleted
}
