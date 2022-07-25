import { Subjects } from './subjects';
import { Producer, Message } from 'redis-smq'

interface Event {
  subject: Subjects,
  data: any
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