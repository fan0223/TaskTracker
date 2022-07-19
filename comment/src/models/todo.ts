import mongoose from 'mongoose'

interface TodoAttrs {
  id: string
}
interface TodoDoc extends mongoose.Document {

}
interface TodoModel extends mongoose.Model<TodoDoc> {
  build(attrs: TodoAttrs): TodoDoc
}

const todoSchema = new mongoose.Schema({
  // only store _id from todo
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
    _id: attrs.id
  })
}

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema)
export { Todo }