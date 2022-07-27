import { Consumer, Message } from 'redis-smq'
import { Subjects } from './subjects';
import { ICallback } from 'redis-smq-common/dist/types';
import { TodoCreatedEvent } from './todo-created-event'

interface Event {
  subject: Subjects,
  data: any
}
export abstract class CustomConsumer<T extends Event> {
  abstract queueName: T["subject"]
  abstract messageHandler: (msg: Message, cb: ICallback<void>) => void
  protected consumer: Consumer;

  constructor() {
    this.consumer = new Consumer()
  }


  listen() {
    // this.consumer.consume(
    //   this.queueName,
    //   this.messageHandler,
    //   (err) => {
    //     if (err) console.log(err)
    //   }
    // )
    this.consumer.run()
  }
}

// export class TodoCreatedConsumer extends CustomConsumer<TodoCreatedEvent>{
//   queueName: Subjects.TodoCreated = Subjects.TodoCreated;
//   messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg, cb) => {
//     const payload = msg.getBody()
//     console.log('Message payload ', payload)
//     cb()
//   }
//   constructor() {
//     super()
//     this.consumer.consume(
//       this.queueName,
//       this.messageHandler,
//       (err) => {
//         if (err) console.log(err)
//       }
//     )
//   }

// }
// new TodoCreatedConsumer().listen()