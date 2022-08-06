import { CustomProducer, Subjects, Query_CommentDeletedEvent } from '@fan-todo/common'

export class CommentDeletedProducerQuery extends CustomProducer<Query_CommentDeletedEvent>{
  queueName: Subjects.Query_CommentDeleted = Subjects.Query_CommentDeleted
}