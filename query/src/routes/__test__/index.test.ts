import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Todo } from '../../models/todo'

it('return 200 OK , Build Todo model and fetch data', async () => {
  const todoData = {
    title: 'testTitle',
    content: 'testContent',
    userId: new mongoose.Types.ObjectId().toHexString(),
    createdAt: new Date().toLocaleString(),
    userEmail: 'test@test.com',
    comments: [
      {
        todoId: new mongoose.Types.ObjectId().toHexString(),
        createdAt: new Date().toLocaleString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        content: 'testContent1'
      },
      {
        todoId: new mongoose.Types.ObjectId().toHexString(),
        createdAt: new Date().toLocaleString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        content: 'testContent2'
      }
    ]
  }
  const todo = Todo.build(todoData)
  await todo.save()
  const fetchTodo = await Todo.find()
  expect(fetchTodo[0].comments.length).toEqual(2)

})