import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants';

export const TOPICS = {
  RESOURCES: {
    CREATE: 'resource.create',
    CREATE_RESPONSE: 'resource.create.response',
    DELETE: 'resource.delete',
    DELETE_RESPONSE: 'resource.delete.response',
    GET: 'resource.get',
    GET_RESPONSE: 'resource.get.response',
  },
};

export const KAFKA_CONFIG = {
  clientId: {
    RESOURCES: 'resources-service',
  },
  consumerId: {
    RESOURCE: 'resources-consumer',
  },
  groupId: {
    RESOURCE: 'resources-group',
  },
  brokers: ['localhost:9092'],
};
