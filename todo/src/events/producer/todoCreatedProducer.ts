import { CustomProducer, Subjects, TodoCreatedEvent } from '@fan-todo/common'

export class TodoCreatedProducer extends CustomProducer<TodoCreatedEvent>{
  queueName: Subjects.TodoCreated = Subjects.TodoCreated
}

// const fn =async ()=>{
//   await new TodoCreatedProducer().produce()
// }