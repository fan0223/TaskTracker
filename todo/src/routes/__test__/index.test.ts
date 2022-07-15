import request from 'supertest'
import { app } from '../../app'

const createTodo = () => {
  return request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .send({
      title: 'testTitle',
      content: 'testContent'
    })
}

it('can fetch a list of all todo', async () => {
  await createTodo()
  await createTodo()
  await createTodo()

  const response = await request(app)
    .get('/api/todo')
    .expect(200)
  expect(response.body.length).toEqual(3)
})