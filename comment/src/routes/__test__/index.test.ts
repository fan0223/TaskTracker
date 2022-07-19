import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Todo } from '../../models/todo'
import { Comment } from '../../models/comment'


const createComment = (id: string) => {
  return request(app)
    .post(`/api/todo/${id}/comment`)
    .set('Cookie', global.signin())
    .send({
      content: 'testContent'
    })
    .expect(201)
}
// it('Return 404 not found if the todoId dose not exist', async () => {
//   const id = new mongoose.Types.ObjectId().toHexString()
//   await request(app)
//     .post(`/api/todo/${id}/comment`)
//     .expect(404)
// })

it('Return 200 , fetch all comment', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const todo = Todo.build({
    id
  })
  await todo.save()

  await createComment(todo.id)
  await createComment(todo.id)
  await createComment(todo.id)

  const response = await request(app)
    .get(`/api/todo/${todo.id}/comment`)
    .expect(200)
  expect(response.body.length).toEqual(3)
})

