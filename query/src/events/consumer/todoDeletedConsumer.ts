import { CustomConsumer, NotFoundError, Query_TodoDeletedEvent, Subjects } from '@fan-todo/common'
import { ICallback } from 'redis-smq-common/dist/types';
import { Message } from 'redis-smq'
import { Todo } from '../../models/todo';
import mongoose from 'mongoose'
export class TodoDeletedConsumer extends CustomConsumer<Query_TodoDeletedEvent>{
  queueName: Subjects.Query_TodoDeleted = Subjects.Query_TodoDeleted
  messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg, cb) => {
    const payload = msg.getBody() as Query_TodoDeletedEvent['data']
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
