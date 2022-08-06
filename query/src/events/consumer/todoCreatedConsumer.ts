import { CustomConsumer, Query_TodoCreatedEvent, Subjects } from '@fan-todo/common'
import { ICallback } from 'redis-smq-common/dist/types';
import { Message } from 'redis-smq'
import { Todo } from '../../models/todo';
export class TodoCreatedConsumer extends CustomConsumer<Query_TodoCreatedEvent>{
  queueName: Subjects.Query_TodoCreated = Subjects.Query_TodoCreated;
  messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg, cb) => {
    const payload = msg.getBody() as Query_TodoCreatedEvent['data']
    console.log('Received ', payload, `by: ${this.queueName}`)

    const { id, title, content, userId, userEmail, createdAt } = payload
    const todo = Todo.build(payload)
    await todo.save()

    console.log("Created : ", todo)
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
