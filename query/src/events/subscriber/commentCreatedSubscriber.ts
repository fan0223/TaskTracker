import { CustomSubscribe, CommentCreatedEvent, Subjects } from '@fan-todo/common'
import { Todo } from '../../models/todo';

export class CommentCreatedSubscriber extends CustomSubscribe<CommentCreatedEvent>{
  channel: Subjects.CommentCreated = Subjects.CommentCreated
  messageHandler: (channel: CommentCreatedEvent['subject'], message: string) => void = async (channel, message) => {
    const payload = JSON.parse(message) as CommentCreatedEvent['data']
    console.log('Received: ', payload, `by: ${channel}`)

    const { id, todoId, userId, userName, createdAt, content } = payload

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $push: {
          comments: {
            commentId: id,
            todoId,
            userId,
            userName,
            createdAt,
            content
          }
        }
      }
    )
    await updatedTodo?.save()
    console.log('Updated: ', updatedTodo)
  }
}
