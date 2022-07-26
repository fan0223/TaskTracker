import { Producer, Message } from 'redis-smq'
import { config } from './config'

const producer = new Producer()



const message = new Date()
const msg = new Message()
msg.setPriority(Message.MessagePriority.HIGH).setQueue('test_queue1')
msg.setBody({ subject: message }).setQueue('test_queue1')
producer.produce(msg, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(msg.getBody())
  }
})

