import mongoose from 'mongoose';
import mongosoe from 'mongoose'

interface CommentAttrs {
  id: string,
  todoId: string,
  createdAt: string,
  userId: string,
  content: string
}
interface CommentDoc extends mongosoe.Document {
  todoId: string,
  createdAt: string,
  userId: string,
  content: string
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc
}

const CommentSchema = new mongoose.Schema({
  todoId: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

CommentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment({
    _id: attrs.id,
    todoId: attrs.todoId,
    userId: attrs.userId,
    content: attrs.content,
    createdAt: attrs.createdAt
  })
}
const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', CommentSchema)
export { Comment, CommentSchema }
