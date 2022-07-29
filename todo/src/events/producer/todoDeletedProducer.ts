import { CustomProducer, Subjects, TodoDeletedEvent } from '@fan-todo/common'

export class TodoCreatedProducer extends CustomProducer<TodoDeletedEvent>{
  queueName: Subjects.TodoDeleted = Subjects.TodoDeleted
}