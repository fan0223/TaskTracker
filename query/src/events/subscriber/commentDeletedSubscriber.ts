import { CustomSubscribe, CommentDeletedEvent, Subjects } from '@fan-todo/common'
import { Todo } from '../../models/todo';
export class CommentDeletedSubscriber extends CustomSubscribe<CommentDeletedEvent>{
  channel: Subjects.CommentDeleted = Subjects.CommentDeleted
  messageHandler: (channel: CommentDeletedEvent['subject'], message: string) => void = async (channel, message) => {
    const payload = JSON.parse(message) as CommentDeletedEvent['data']
    console.log('Received: ', payload, `by: ${channel}`)

    const { id, todoId, userId, createdAt, content } = payload

    const todo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $pull: { 'comments': { commentId: id } }
      }
    )

    await todo?.save()
  }
}
