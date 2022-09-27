import dotenv from 'dotenv';
dotenv.config();


import AWS from 'aws-sdk';

const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;


import express, { Response, Request } from 'express'
import { requireAuth, NotFoundError, NotAuthorizedError } from '@fan-todo/common'
import { todoDeletedPublisher } from '../events/publisher/todoDeletedPublisher';
import { Todo } from '../models/todo'
import { s3Client } from '../events/s3-client'

const router = express.Router()

router.delete('/api/todo/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const todo = await Todo.findById(id)
    if (!todo) {
      throw new NotFoundError()
    }
    if (todo.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
    }
    const deletedTodo = await Todo.findByIdAndDelete(id)
    if (!deletedTodo) {
      throw new NotFoundError()
    }

    const BUCKET_NAME = process.env.BUCKET_NAME as string
    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: deletedTodo.imageName
    }
    await s3Client.headObject(deleteParams).promise()
    console.log("File Found in S3")
    try {
      await s3Client.deleteObject(deleteParams).promise()
      console.log("file deleted Successfully")
    }
    catch (err) {
      console.log("ERROR in file Deleting : " + JSON.stringify(err))
    }
    new todoDeletedPublisher().publish({
      id: deletedTodo.id,
      userId: deletedTodo.userId
    })

    res.status(200).send(deletedTodo)
  } catch (error: any) {
    console.log(error)
  }

})

export { router as deleteTodoRouter }