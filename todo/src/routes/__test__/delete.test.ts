import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Todo } from '../../models/todo'

it('return 404 not found if the provided id dose not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .delete(`/api/todo/${id}`)
    .set('Cookie', global.signin())
    .expect(404)
})
it('return 401 not authenticate if the user is not signin', async () => {
  const response = await request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      content: 'test'
    })
    .expect(201)
  await request(app)
    .delete(`/api/todo/${response.body.id}`)
    .expect(401)
})
it('return 401 not authenticate if the user is not own the todo', async () => {
  const response = await request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      content: 'test'
    })
    .expect(201)
  await request(app)
    .delete(`/api/todo/${response.body.id}`)
    .expect(401)
})
it('return 200 OK.Provided correct id and return deleted todo.', async () => {
  const title = 'testTitle'
  const content = 'testContent'
  const cookie = global.signin()
  const response = await request(app)
    .post('/api/todo')
    .set('Cookie', cookie)
    .send({
      title: title,
      content: content
    })
    .expect(201)
  const deletedTodo = await request(app)
    .delete(`/api/todo/${response.body.id}`)
    .set('Cookie', cookie)
    .expect(200)
  expect(deletedTodo.body.title).toEqual(title)
  expect(deletedTodo.body.content).toEqual(content)
  expect(deletedTodo.body.id).toEqual(response.body.id)
})