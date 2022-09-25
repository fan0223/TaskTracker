import Redis from 'ioredis'
const redis = new Redis()


interface a {
  id: string,
  count: number
}
const channel = 'test'
// const message = new Date().toString()
const message = {
  id: 'asdmwoadna',
  name: 'james',
  price: 100
}
redis.publish(channel, JSON.stringify(message), (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Publish ${message} to channel ${channel}`)
  }
})