import { CustomConsumer, TodoCreatedEvent, Subjects } from '@fan-todo/common'
import { ICallback } from 'redis-smq-common/dist/types';
import { Message } from 'redis-smq'
export class TodoCreatedConsumer extends CustomConsumer<TodoCreatedEvent>{
  queueName: Subjects.TodoCreated = Subjects.TodoCreated;
  messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg, cb) => {
    const payload = msg.getBody()
    console.log('Received ', payload, `by: ${this.queueName}`)
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
