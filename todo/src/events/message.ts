import { Subjects, TodoCreatedEvent } from '@fan-todo/common';
import mongoose from 'mongoose';
import { Producer, Message, QueueManager } from 'redis-smq'
import { ICallback } from 'redis-smq-common/dist/types'

interface Event {
  subject: Subjects,
  data: any
}

abstract class CustomMessage {
  public message;
  constructor(data: TodoCreatedEvent["data"], queueName: TodoCreatedEvent["subject"]) {
    this.message = new Message()
    this.message.setPriority(Message.MessagePriority.HIGH).setQueue(queueName)
    this.message.setBody(data).setQueue(queueName)
  }
}


export abstract class CustomProducer<T extends Event> {
  protected producer: Producer;
  protected message: Message;
  abstract queueName: T["subject"]

  constructor() {
    this.producer = new Producer()
    this.message = new Message()
  }

  produce(data: T["data"]): Promise<void> {
    this.message.setPriority(Message.MessagePriority.HIGH).setQueue(this.queueName)
    this.message.setBody(data).setQueue(this.queueName)

    return new Promise((resolve, reject) => {
      this.producer.produce(this.message, (err) => {
        if (err) {
          console.log(err)
          reject()
        } else {
          console.log(this.message.getBody())
          resolve()
        }
      })
    })
  }
}

class TodoCreateProducer extends CustomProducer<TodoCreatedEvent>{
  queueName: Subjects.TodoCreated = Subjects.TodoCreated
}
// const producer = new TodoCreateProducer()
// await producer.produce({
//   id: new mongoose.Types.ObjectId().toHexString(),
//   title: 'test',
//   content: 'asdsad',
//   userEmail: 'adw@asdas.com',
//   userId: new mongoose.Types.ObjectId().toHexString(),
//   createdAt: 'asdmoiwn'
// })