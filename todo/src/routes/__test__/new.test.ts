import request from 'supertest'
import { app } from '../../app'
import { Todo } from '../../models/todo'

it('Return 201 created with valid inputs and Route handler listening to /api/todo for POST request', async () => {
  let todo = await Todo.find({})
  expect(todo.length).toEqual(0)

  const response = await request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .send({
      'title': "test",
      'content': "testContent"
    })
  expect(response.status).toEqual(201)

  todo = await Todo.find({})
  expect(todo.length).toEqual(1)

})

it('Return 400 Bad request if provided an invalid paramster', async () => {
  await request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .send({
      'title': '',
      'content': "test"
    })
    .expect(400)
  await request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .send({})
    .expect(400)
})

it('return 401 not authenticate if the user is not authenticate', async () => {
  await request(app)
    .post('/api/todo')
    .send({
      'title': '',
      'content': "test"
    })
    .expect(401)
})