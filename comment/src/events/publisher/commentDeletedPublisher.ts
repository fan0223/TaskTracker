import { CustomPublish, Subjects, CommentDeletedEvent } from '@fan-todo/common'

export class commentDeletedPublisher extends CustomPublish<CommentDeletedEvent>{
  channel: Subjects.CommentDeleted = Subjects.CommentDeleted
}