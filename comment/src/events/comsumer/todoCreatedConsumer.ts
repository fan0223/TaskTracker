import { CustomConsumer, Comment_TodoCreatedEvent, Subjects } from '@fan-todo/common'
import { ICallback } from 'redis-smq-common/dist/types';
import { Message } from 'redis-smq'
import { Todo } from '../../models/todo';

export class TodoCreatedConsumer extends CustomConsumer<Comment_TodoCreatedEvent>{
  queueName: Subjects.Comment_TodoCreated = Subjects.Comment_TodoCreated
  messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg: Message, cb) => {
    const payload = msg.getBody() as Comment_TodoCreatedEvent['data']
    console.log('Received ', payload, `by: ${this.queueName}`)

    const { id } = payload
    const newTodo = Todo.build({ id })
    await newTodo.save()
    console.log("Created : ", newTodo)

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
