import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Todo } from '../../models/todo'

it('return 404 not found if the todo id is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .get(`/api/todo/${id}`)
    .expect(404)
})
it('return 200 OK if the todo is found', async () => {
  const title = 'testTitle'
  const content = 'testContent'

  const createTodo = await request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .send({ title, content })
    .expect(201)

  const showTodo = await request(app)
    .get(`/api/todo/${createTodo.body.id}`)
    .expect(200)

  expect(showTodo.body.title).toEqual(title)
  expect(showTodo.body.content).toEqual(content)
})