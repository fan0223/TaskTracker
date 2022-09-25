import { CustomPublish, Subjects, TodoCreatedEvent } from '@fan-todo/common'


export class todoCreatedPublisher extends CustomPublish<TodoCreatedEvent>{
  channel: Subjects.TodoCreated = Subjects.TodoCreated
}
