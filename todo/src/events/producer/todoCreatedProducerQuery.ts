import { CustomProducer, Subjects, Query_TodoCreatedEvent } from '@fan-todo/common'


export class TodoCreatedProducerQuery extends CustomProducer<Query_TodoCreatedEvent>{
  queueName: Subjects.Query_TodoCreated = Subjects.Query_TodoCreated
}

// new todoCreatedProducerQuery().produce({})