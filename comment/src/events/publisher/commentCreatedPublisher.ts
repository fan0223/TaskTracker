import { CustomPublish, Subjects, CommentCreatedEvent } from '@fan-todo/common'

export class commentCreatedPublisher extends CustomPublish<CommentCreatedEvent>{
  channel: Subjects.CommentCreated = Subjects.CommentCreated
}