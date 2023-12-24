import { IUserRepository } from '../repositories';

export abstract class DatabaseService {
  sql?: ISQLDatabaseService;
  nosql?: IMongoDatabaseService;
  // abstract nosql: MongoDatabaseService;
  // abstract rooms: IRepository<Room>;
  // abstract resources: IRepository<Response>;
  // abstract messages: IRepository<Message>;
}

export abstract class ISQLDatabaseService {
  abstract user: IUserRepository;
}

export abstract class IMongoDatabaseService {
  abstract user: IUserRepository;
}
