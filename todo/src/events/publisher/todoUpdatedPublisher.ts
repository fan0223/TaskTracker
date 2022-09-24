import { CustomPublish, Subjects, TodoUpdatedEvent } from '@fan-todo/common'


export class todoUpdatedPublisher extends CustomPublish<TodoUpdatedEvent>{
  channel: Subjects.TodoUpdated = Subjects.TodoUpdated
}