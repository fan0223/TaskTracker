import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Todo } from '../../models/todo'
import { Comment } from '../../models/comment'

it('Return 201 created if provided valid paramster', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const todo = Todo.build({
    id
  })
  await todo.save()

  const response = await request(app)
    .post(`/api/todo/${todo.id}/comment`)
    .set('Cookie', global.signin())
    .send({
      content: 'testContent'
    })
    .expect(201)
  const comment = await Comment.find()
  expect(comment.length).toEqual(1)
  expect(response.body.content).toEqual('testContent')
})
it('Return 404 not found if the todoId is not exist ', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .post(`/api/todo/${id}/comment`)
    .set('Cookie', global.signin())
    .send({
      content: 'testContent'
    })
    .expect(404)
})
it('Return 400 Bad request if provide an invalid paramster', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const todo = Todo.build({
    id
  })
  await todo.save()

  await request(app)
    .post(`/api/todo/${todo.id}/comment`)
    .set('Cookie', global.signin())
    .send({
      content: ''
    })
    .expect(400)
})
it('Return 401 not authenticate if the user dose not authenticate', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const todo = Todo.build({
    id
  })
  await todo.save()

  await request(app)
    .post(`/api/todo/${todo.id}/comment`)
    .send({
      content: 'testContent'
    })
    .expect(401)
})
// it('', async()=>{})
