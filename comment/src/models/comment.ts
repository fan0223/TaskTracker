import mongoose from 'mongoose'

interface CommentAttrs {
  todoId: string,
  userId: string,
  userName: string,
  createdAt: string,
  content: string
}
interface CommentDoc extends mongoose.Document {
  todoId: string,
  userId: string,
  userName: string,
  createdAt: string,
  content: string
}
interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc
}

const commentSchema = new mongoose.Schema({
  todoId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs)
}
const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', commentSchema)
export { Comment }