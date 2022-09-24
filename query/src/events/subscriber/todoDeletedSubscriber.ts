import { CustomSubscribe, TodoDeletedEvent, Subjects } from '@fan-todo/common'
import { Todo } from '../../models/todo';
export class TodoDeletedSubscriber extends CustomSubscribe<TodoDeletedEvent>{
  channel: Subjects.TodoDeleted = Subjects.TodoDeleted
  messageHandler: (channel: TodoDeletedEvent['subject'], message: string) => void = async (channel, message) => {
    const payload = JSON.parse(message) as TodoDeletedEvent['data']
    console.log('Received: ', payload, `by: ${channel}`)

    const { id } = payload

    await Todo.findByIdAndDelete(id)
      .then((todo) => {
        console.log('deleted:', todo)
      })
  }
}
