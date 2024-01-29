import { IRepository } from '../repositories';

export abstract class DatabaseService {
  sql?: ISQLDatabaseService;
  nosql?: IMongoDatabaseService;
  // abstract nosql: MongoDatabaseService;
  // abstract rooms: IRepository<Room>;
  // abstract resources: IRepository<Response>;
  // abstract messages: IRepository<Message>;
}

export abstract class ISQLDatabaseService {
  abstract user: IRepository<unknown>;
}

export abstract class IMongoDatabaseService {
  abstract user: IRepository<unknown>;
}
