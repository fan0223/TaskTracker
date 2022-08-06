import { CustomProducer, Subjects, Query_TodoUpdatedEvent } from '@fan-todo/common'


export class TodoUpdatedProducerQuery extends CustomProducer<Query_TodoUpdatedEvent>{
  queueName: Subjects.Query_TodoUpdated = Subjects.Query_TodoUpdated
}
