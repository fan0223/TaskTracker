import { CustomConsumer, NotFoundError, Query_TodoUpdatedEvent, Subjects } from '@fan-todo/common'
import { ICallback } from 'redis-smq-common/dist/types';
import { Message } from 'redis-smq'
import { Todo } from '../../models/todo';
export class TodoUpdatedConsumer extends CustomConsumer<Query_TodoUpdatedEvent>{
  queueName: Subjects.Query_TodoUpdated = Subjects.Query_TodoUpdated
  messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg, cb) => {
    const payload = msg.getBody() as Query_TodoUpdatedEvent['data']
    console.log('Received ', payload, `by: ${this.queueName}`)
    const { id, title, content } = payload
    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content
      }
    )
    if (!todo) {
      throw new NotFoundError()
    }
    await todo.save()
    console.log("Updated : ", todo)

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
