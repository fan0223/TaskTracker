import Redis from 'ioredis'
const redis = new Redis()

const channel = 'test'
redis.subscribe(channel, (err) => {
  if (err) {
    console.log('Failed to subscribe :%s', err.message)
  } else {
    console.log('Subscribe successfully!')
  }
})
redis.on('message', (channel, message) => {
  console.log(`Received ${message} from ${channel}`)
})