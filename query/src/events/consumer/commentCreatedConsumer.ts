import { CustomConsumer, Query_CommentCreatedEvent, Subjects } from '@fan-todo/common'
import { ICallback } from 'redis-smq-common/dist/types';
import { Message } from 'redis-smq'
import { Todo } from '../../models/todo';

import mongoose from 'mongoose';
export class CommentCreatedConsumer extends CustomConsumer<Query_CommentCreatedEvent>{
  queueName: Subjects.Query_CommentCreated = Subjects.Query_CommentCreated
  messageHandler: (msg: Message, cb: ICallback<void>) => void = async (msg, cb) => {
    const payload = msg.getBody() as Query_CommentCreatedEvent['data']
    console.log('Received ', payload, `by: ${this.queueName}`)

    const { id, todoId, userId, userName, createdAt, content } = payload
    // const comment = Comment.build({ id, todoId, userId, createdAt, content })
    // await comment.save()
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $push: {
          comments: {
            commentId: id,
            todoId,
            userId,
            userName,
            createdAt,
            content
          }
        }
      }
    )
    console.log(updatedTodo)
    // updatedTodo?.comments.push({
    //   id, todoId, userId, createdAt, content
    // })

    cb()
  }
  constructor() {
    super()
    this.consumer.consume(
      this.queueName,
      this.messageHandler,
      (err) => {
        if (err) console.log(err)
      }
    )
  }
}
