import Redis from 'ioredis'
const redis = new Redis()


interface a {
  id: string,
  count: number
}
const channel = 'test'
const message = new Date().toString()
redis.publish(channel, message, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Publish ${message} to channel ${channel}`)
  }
})