import { CustomSubscribe, TodoUpdatedEvent, Subjects } from '@fan-todo/common'
import { Todo } from '../../models/todo';
export class TodoUpdatedSubscriber extends CustomSubscribe<TodoUpdatedEvent>{
  channel: Subjects.TodoUpdated = Subjects.TodoUpdated
  messageHandler: (channel: TodoUpdatedEvent['subject'], message: string) => void = async (channel, message) => {
    const payload = JSON.parse(message) as TodoUpdatedEvent['data']
    console.log('Received: ', payload, `by: ${channel}`)

    const { id, title, content } = payload
    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content
      }
    )

    await todo?.save()
    console.log("Updated : ", todo)
  }
}
