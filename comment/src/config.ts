import {
  ICallback,
  TLoggerConfig,
  TRedisConfig,
} from 'redis-smq-common/dist/types';
import { RedisClientName } from 'redis-smq-common/dist/types';

interface IMessagesConfig {
  store: {
    deadLettered: boolean
  }
}

export interface IConfig {
  redis?: TRedisConfig;
  namespace?: string;
  logger?: TLoggerConfig;
  messages?: IMessagesConfig;
}
export const config: IConfig = {
  namespace: 'redismq',
  redis: {
    client: RedisClientName.IOREDIS,
    options: {
      host: 'redis-srv',
      port: 6379
    },
  },
  logger: {
    enabled: true,
    options: {
      level: 'info'
    }
  },
  messages: {
    store: {
      deadLettered: true,
    }
  }
}