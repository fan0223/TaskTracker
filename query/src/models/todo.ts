import mongoose from 'mongoose'

interface comment {
  todoId: string,
  createdAt: string,
  userId: string,
  content: string
}
interface TodoAttrs {
  title: string,
  content: string,
  userId: string,
  createdAt: string,
  userEmail: string,
  comments: Array<comment>
}
interface TodoDoc extends mongoose.Document {
  title: string,
  content: string,
  userId: string,
  createdAt: string,
  userEmail: string,
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
  comments: {
    type: [{
      todoId: String,
      createdAt: String,
      userId: String,
      content: String
    }],
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

todoSchema.statics.build = (attrs: TodoAttrs) => {
  return new Todo(attrs)
}

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema)
export { Todo }