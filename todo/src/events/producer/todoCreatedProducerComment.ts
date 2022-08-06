import { CustomProducer, Subjects, Comment_TodoCreatedEvent } from '@fan-todo/common'


export class TodoCreatedProducerComment extends CustomProducer<Comment_TodoCreatedEvent>{
  queueName: Subjects.Comment_TodoCreated = Subjects.Comment_TodoCreated
}

// new todoCreatedProducerQuery().produce({})