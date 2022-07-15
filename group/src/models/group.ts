import mongoose, { Types } from 'mongoose'
import { TodoDoc } from './todo'

interface GroupAttrs {
  todo: TodoDoc,
  member: string,
}
interface GroupDoc extends mongoose.Document {
  todo: TodoDoc,
  member: Types.Array<string>,
}
interface GroupModel extends mongoose.Model<GroupDoc> {
  build(attr: GroupAttrs): GroupDoc
}

const groupSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  member: {
    type: [String]
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
})

groupSchema.statics.build = (attrs: GroupAttrs) => {
  return new Group(attrs)
}

const Group = mongoose.model<GroupDoc, GroupModel>('Group', groupSchema)
export { Group }
