import { CustomSubscribe, TodoCreatedEvent, Subjects } from '@fan-todo/common'
import { Todo } from '../../models/todo';

export class TodoCreatedSubscribe extends CustomSubscribe<TodoCreatedEvent>{
  channel: Subjects.TodoCreated = Subjects.TodoCreated
  messageHandler: (channel: TodoCreatedEvent['subject'], message: string) => void = async (channel, message) => {
    const payload = JSON.parse(message) as TodoCreatedEvent['data']
    console.log('Received: ', payload, `by: ${this.channel}`)

    const { id } = payload
    const newTodo = Todo.build({ id })
    await newTodo.save()
    console.log("Created : ", newTodo)
  }
}
