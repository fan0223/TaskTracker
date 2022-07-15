import { Subjects } from '@fan-todo/common'
export const todoCreated = function (err: any, queueManager: any) {
  const queueName = Subjects.TodoCreated
  if (err) {
    console.log(err)
  } else {
    queueManager.queue.exists(Subjects.TodoCreated, (err: Error, reply: any) => {
      if (err) {
        console.log(err)
      } else if (reply) {
        queueManager.queue.delete(Subjects.TodoCreated, (err: Error) => console.log(err))
      }
    })

    queueManager.queue.create(queueName, true, (err: any) => {
      if (err) {
        console.log(err)
      }
      console.log('queue created by:', queueName)
    })
  }
}