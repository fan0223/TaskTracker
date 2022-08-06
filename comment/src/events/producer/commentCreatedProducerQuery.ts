import { CustomProducer, Subjects, Query_CommentCreatedEvent } from '@fan-todo/common'

export class CommentCreatedProducerQuery extends CustomProducer<Query_CommentCreatedEvent>{
  queueName: Subjects.Query_CommentCreated = Subjects.Query_CommentCreated
}