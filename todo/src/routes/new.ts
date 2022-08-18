import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express'
import { Todo } from '../models/todo'
import { BadRequestError, NotFoundError, requireAuth, validateRequest } from '@fan-todo/common'
import { body } from 'express-validator'
import { TodoCreatedProducerQuery } from '../events/producer/todoCreatedProducerQuery'
import { TodoCreatedProducerComment } from '../events/producer/todoCreatedProducerComment'

import multer from 'multer';
import AWS from 'aws-sdk';
import crypto from 'crypto';
import sharp from 'sharp';



const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const randomImageName = () => crypto.randomBytes(32).toString('hex');
const region = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new AWS.S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

router.post('/api/todo',
  requireAuth,
  upload.single('image'),
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('content')
      .not()
      .isEmpty()
      .withMessage('Content is required'),
    // body('image')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Cover image is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, content } = req.body
    console.log('req.file', req.file);
    if (!req.file) {
      throw new BadRequestError('Wrong cover image')
    }
    // // handle s3 and image upload
    const ImageBuffer = await sharp(req.file.buffer)
      .resize({ height: 1920 })
      .toBuffer()
    const imageName = randomImageName();
    console.log(imageName)
    const putObjectParams = {
      Bucket: bucketName,
      Key: imageName,
      Body: ImageBuffer,
      ContentType: req.file.mimetype,
    };

    // S3 upload
    const putObjectWrapper = (params: any) => {
      return new Promise((resolve, reject) => {
        s3Client.putObject(params, function (err, result) {
          if (err) reject(err);
          if (result) resolve(result);
        });
      })
    }
    await putObjectWrapper(putObjectParams);
    // After s3 upload image, fetch image url, store in database.
    const getUrlParams = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    }
    let imageUrl = s3Client.getSignedUrl('getObject', getUrlParams)

    const todo = Todo.build({
      title,
      content,
      userId: req.currentUser!.id,
      userEmail: req.currentUser!.email,
      createAt: new Date().toLocaleString(),
      imageName,
      imageUrl
    })

    await todo.save()


    // Message Queue produce to Query.
    await new TodoCreatedProducerQuery().produce({
      id: todo.id,
      title: todo.title,
      content: todo.content,
      userId: todo.userId,
      userEmail: todo.userEmail,
      createdAt: todo.createAt,
      imageName: todo.imageName,
      imageUrl: todo.imageUrl
    })

    // Message Queue produce to Comment.
    // await new TodoCreatedProducerComment().produce({
    //   id: todo.id,
    //   title: todo.title,
    //   content: todo.content,
    //   userId: todo.userId,
    //   userEmail: todo.userEmail,
    //   createdAt: todo.createAt
    // })

    res.status(201).send(todo)
  })

export { router as newTodoRouter }