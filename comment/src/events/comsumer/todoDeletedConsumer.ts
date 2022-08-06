import { CustomConsumer, Comment_TodoDeletedEvent, Subjects, NotFoundError } from '@fan-todo/common'
import { ICallback } from 'redis-smq-common/dist/types';
import { Message } from 'redis-smq'
import { Todo } from '../../models/todo';
export class TodoDeletedConsumer extends CustomConsumer<Comment_TodoDeletedEvent>{
  queueName: Subjects.Comment_TodoDeleted = Subjects.Comment_TodoDeleted
  messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg, cb) => {
    const payload = msg.getBody() as Comment_TodoDeletedEvent['data']
    console.log('Received ', payload, `by: ${this.queueName}`)

    const { id } = payload
    await Todo.findByIdAndDelete(id)
      .then((todo) => {
        console.log('deleted:', todo)
      })

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
