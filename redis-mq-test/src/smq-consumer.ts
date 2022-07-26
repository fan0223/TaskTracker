import { config } from './config';
import { Consumer, Message } from 'redis-smq'
import { ICallback } from 'redis-smq-common/dist/types';

const consumer = new Consumer()
const messageHandler = (msg: Message, cb: ICallback<void>) => {
  const payload = msg.getBody()

  console.log('Message payload ', payload)
  cb()
}

consumer.consume(
  'test_queue1',
  messageHandler,
  (err) => {
    if (err) console.log(err)
  }
)
consumer.run()