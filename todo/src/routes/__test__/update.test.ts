import { async } from 'redis-smq-common'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../app'
import { todoUpdatedPublisher } from '../../events/publisher/todoUpdatedPublisher'


it('return 404 if the provide id dose not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/todo/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      content: 'test'
    })
    .expect(404)
})
it('return 401 if the user is not authenticate', async () => {
  const response = await request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .field('title', "test")
    .field('content', "testContent")
    .attach('image', "C:/Users/louie/Desktop/images.jpg")
    .expect(201)
  await request(app)
    .put(`/api/todo/${response.body.id}`)
    .send({
      title: 'update',
      content: 'update'
    })
    .expect(401)
})
it('return 401 if the user dose not own the todo', async () => {
  const response = await request(app)
    .post('/api/todo')
    .set('Cookie', global.signin())
    .field('title', "test")
    .field('content', "testContent")
    .attach('image', "C:/Users/louie/Desktop/images.jpg")
    .expect(201)
  await request(app)
    .put(`/api/todo/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'update',
      content: 'update'
    })
    .expect(401)
})
it('return 400 if the user provides an invalid input', async () => {
  const cookie = global.signin()
  const response = await request(app)
    .post('/api/todo')
    .set('Cookie', cookie)
    .field('title', "test")
    .field('content', "testContent")
    .attach('image', "C:/Users/louie/Desktop/images.jpg")
    .expect(201)
  await request(app)
    .put(`/api/todo/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      content: ''
    })
    .expect(400)
})
it('return 200 OK. updates the todo provided valid input', async () => {
  const cookie = global.signin()
  const updateTitle = 'updateTitle'
  const updateContent = 'updateContent'
  const response = await request(app)
    .post('/api/todo')
    .set('Cookie', cookie)
    .field('title', "test")
    .field('content', "testContent")
    .attach('image', "C:/Users/louie/Desktop/images.jpg")
    .expect(201)
  const updatedTodo = await request(app)
    .put(`/api/todo/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: updateTitle,
      content: updateContent
    })
    .expect(200)
  expect(updatedTodo.body.title).toEqual(updateTitle)
  expect(updatedTodo.body.content).toEqual(updateContent)
  expect(todoUpdatedPublisher).toHaveBeenCalled()
})