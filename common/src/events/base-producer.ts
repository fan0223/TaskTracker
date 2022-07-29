import { Subjects } from './subjects';
import { Producer, Message } from 'redis-smq'
import { Config } from './config'
interface Event {
  subject: Subjects,
  data: any
}

export abstract class CustomProducer<T extends Event> {
  producer: Producer;
  protected message: Message;
  abstract queueName: T["subject"]

  constructor() {
    this.producer = new Producer(Config)
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
        }
        console.log(this.message.getBody())
        resolve()

      })
      this.producer.run()
    })
  }
}