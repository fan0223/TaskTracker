import { CustomSubscribe, TodoCreatedEvent, Subjects } from '@fan-todo/common'
import { Todo } from '../../models/todo';
export class TodoCreatedSubscriber extends CustomSubscribe<TodoCreatedEvent>{
  channel: Subjects.TodoCreated = Subjects.TodoCreated
  messageHandler: (channel: TodoCreatedEvent['subject'], message: string) => void = async (channel, message) => {
    const payload = JSON.parse(message) as TodoCreatedEvent['data']
    console.log('Received: ', payload, `by: ${channel}`)

    const todo = Todo.build(payload)
    await todo.save()

    console.log("Created : ", todo)
  }
}
