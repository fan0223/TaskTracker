import { CustomSubscribe, TodoDeletedEvent, Subjects } from '@fan-todo/common'
import { Todo } from '../../models/todo';
import { Comment } from '../../models/comment';
export class TodoDeletedSubscribe extends CustomSubscribe<TodoDeletedEvent>{
  channel: Subjects.TodoDeleted = Subjects.TodoDeleted
  messageHandler: (channel: TodoDeletedEvent['subject'], message: string) => void = async (channel, message) => {
    const payload = JSON.parse(message) as TodoDeletedEvent['data']
    console.log('Received: ', payload, `by: ${this.channel}`)

    const { id } = payload
    await Todo.findByIdAndDelete(id)
      .then((todo) => {
        console.log('Deleted todo:', todo)
      })
    await Comment.deleteMany({ todoId: id })
      .then((comments) => {
        console.log('Deleted comments:', comments)
      })
  }
}