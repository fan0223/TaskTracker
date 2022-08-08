import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Todo } from '../../models/todo'

it('return 200 OK , Build Todo model and fetch data', async () => {
  const todoData = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'testTitle',
    content: 'testContent',
    userId: new mongoose.Types.ObjectId().toHexString(),
    createdAt: new Date().toLocaleString(),
    userEmail: 'test@test.com',

  }
  const todo = Todo.build(todoData)
  await todo.save()
  const fetchTodo = await Todo.find()
  console.log(fetchTodo)
  fetchTodo[0].comments.push(
    {
      todoId: new mongoose.Types.ObjectId().toHexString(),
      commentId: new mongoose.Types.ObjectId().toHexString(),
      createdAt: new Date().toLocaleString(),
      userId: new mongoose.Types.ObjectId().toHexString(),
      content: 'testContent1'
    },
    {
      todoId: new mongoose.Types.ObjectId().toHexString(),
      commentId: new mongoose.Types.ObjectId().toHexString(),
      createdAt: new Date().toLocaleString(),
      userId: new mongoose.Types.ObjectId().toHexString(),
      content: 'testContent2'
    }
  )
  console.log(fetchTodo)
  expect(fetchTodo[0].comments.length).toEqual(2)

})