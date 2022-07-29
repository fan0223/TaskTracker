import { CustomProducer, Subjects, TodoUpdatedEvent } from '@fan-todo/common'

export class TodoCreatedProducer extends CustomProducer<TodoUpdatedEvent>{
  queueName: Subjects.TodoUpdated = Subjects.TodoUpdated
}