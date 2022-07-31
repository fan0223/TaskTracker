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
  queueName: string

  constructor(queueName: string) {
    this.producer = new Producer(Config)
    this.message = new Message()
    this.queueName = queueName
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
        console.log("emit ", this.message.getBody(), `to ${this.queueName}`)
        resolve()

      })
      this.producer.run()
    })
  }
}
// export class TodoProducer extends CustomProducer<Event>{
//   constructor(queueName: string) {
//     super(queueName)
//     this.queueName = queueName
//   }
// }
// new TodoProducer('query-todoCreated').produce({
//   id: todo.id,
//   title: todo.title,
//   content: todo.content,
//   userId: todo.userId,
//   userEmail: todo.userEmail,
//   createdAt: todo.createAt
// })