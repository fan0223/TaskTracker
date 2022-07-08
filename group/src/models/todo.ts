import mongoose from 'mongoose'

interface TodoAttrs {
  title: string,
  content: string,
  userId: string,
  createAt: string,
  userEmail: string
}
export interface TodoDoc extends mongoose.Document {
  title: string,
  content: string,
  userId: string,
  createAt: string,
  userEmail: string
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
  createAt: {
    type: String,
    deafult: new Date().toLocaleString()
  },
  userId: {
    type: String,
    required: true
  },
  userEmail: {
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

todoSchema.statics.build = (attrs: TodoAttrs) => {
  return new Todo(attrs)
}


const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema)
export { Todo }