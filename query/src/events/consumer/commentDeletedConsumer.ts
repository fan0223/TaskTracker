import { CustomConsumer, NotFoundError, Query_CommentDeletedEvent, Subjects } from '@fan-todo/common'
import { ICallback } from 'redis-smq-common/dist/types';
import { Message } from 'redis-smq'
import { Todo } from '../../models/todo';
export class CommentDeletedConsumer extends CustomConsumer<Query_CommentDeletedEvent>{
  queueName: Subjects.Query_CommentDeleted = Subjects.Query_CommentDeleted
  messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg, cb) => {
    const payload = msg.getBody() as Query_CommentDeletedEvent['data']
    console.log('Received ', payload, `by: ${this.queueName}`)

    const { id, todoId, userId, createdAt, content } = payload

    const todo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $pull: { 'comments': { commentId: id } }
      }
    )

    await todo?.save()

    cb()
  }
  constructor() {
    super()
    this.consumer.consume(
      this.queueName,
      this.messageHandler,
      (err) => {
        if (err) console.log(err)
      }
    )
  }
}
