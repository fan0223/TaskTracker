import { CustomProducer, Subjects, Query_TodoDeletedEvent } from '@fan-todo/common'


export class TodoDeletedProducerQuery extends CustomProducer<Query_TodoDeletedEvent>{
  queueName: Subjects.Query_TodoDeleted = Subjects.Query_TodoDeleted
}

// new todoCreatedProducerQuery().produce({})