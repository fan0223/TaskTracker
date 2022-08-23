import mongoose from 'mongoose'

interface comment {
  commentId: string,
  todoId: string,
  createdAt: string,
  userId: string,
  userName: string,
  content: string
}
interface TodoAttrs {
  id: string,
  title: string,
  content: string,
  userId: string,
  createdAt: string,
  userEmail: string,
  imageName: string,
  imageUrl: string
  // comments: Array<comment>
}
interface TodoDoc extends mongoose.Document {
  title: string,
  content: string,
  userId: string,
  createdAt: string,
  userEmail: string,
  imageName: string,
  imageUrl: string
  comments: Array<comment>
}
interface TodoModel extends mongoose.Model<TodoDoc> {
  build(attrs: TodoAttrs): TodoDoc
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  comments: {
    type: [{
      commentId: String,
      todoId: String,
      createdAt: String,
      userId: String,
      userName: String,
      content: String
    }]
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

todoSchema.statics.build = (attrs: TodoAttrs) => {
  return new Todo({
    _id: attrs.id,
    title: attrs.title,
    content: attrs.content,
    userId: attrs.userId,
    userEmail: attrs.userEmail,
    createdAt: attrs.createdAt,
    imageName: attrs.imageName,
    imageUrl: attrs.imageUrl
  })
}

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema)
export { Todo }