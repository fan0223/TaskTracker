import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Comment } from '../../models/comment'
import { Todo } from '../../models/todo'

it('Return 200 OK , success delete specify comment and return.', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const cookie = global.signin()
  const todo = Todo.build({
    id
  })
  await todo.save()

  const response = await request(app)
    .post(`/api/todo/${todo.id}/comment`)
    .set('Cookie', cookie)
    .send({
      content: 'testContent'
    })
    .expect(201)
  const comment = await Comment.find()
  expect(comment.length).toEqual(1)

  const deleteResponse = await request(app)
    .delete(`/api/todo/${todo.id}/comment/${response.body.id}`)
    .set('Cookie', cookie)
    .expect(200)
  const deletedComment = await Comment.find()
  expect(deleteResponse.body.deletedCount).toEqual(1)
  expect(deletedComment.length).toEqual(0)

})
// it('Return 404 not found, the todoId does not exist', async () => {
//   const id = new mongoose.Types.ObjectId().toHexString()
//   const id2 = new mongoose.Types.ObjectId().toHexString()
//   const cookie = global.signin()
//   const todo = Todo.build({
//     id
//   })
//   await todo.save()

//   const response = await request(app)
//     .post(`/api/todo/${todo.id}/comment`)
//     .set('Cookie', cookie)
//     .send({
//       content: 'testContent'
//     })
//     .expect(201)
//   const comment = await Comment.find()
//   expect(comment.length).toEqual(1)

//   await request(app)
//     .delete(`/api/todo/${id2}/comment/${response.body.id}`)
//     .set('Cookie', cookie)
//     .expect(404)
// })
it('Return 401 not authenticate , the user does not authenticate', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  const cookie = global.signin()
  const todo = Todo.build({
    id
  })
  await todo.save()

  const response = await request(app)
    .post(`/api/todo/${todo.id}/comment`)
    .set('Cookie', cookie)
    .send({
      content: 'testContent'
    })
    .expect(201)
  const comment = await Comment.find()
  expect(comment.length).toEqual(1)

  await request(app)
    .delete(`/api/todo/${todo.id}/comment/${response.body.id}`)
    .expect(401)
})
it('Return 400 Bad request, the user cannot delete other comments that they donot own.', async () => {
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

  await request(app)
    .delete(`/api/todo/${todo.id}/comment/${response.body.id}`)
    .set('Cookie', global.signin())
    .expect(400)
})

