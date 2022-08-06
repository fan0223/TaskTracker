import { CustomProducer, Subjects, Comment_TodoDeletedEvent } from '@fan-todo/common'


export class TodoDeletedProducerComment extends CustomProducer<Comment_TodoDeletedEvent>{
  queueName: Subjects.Comment_TodoDeleted = Subjects.Comment_TodoDeleted
}