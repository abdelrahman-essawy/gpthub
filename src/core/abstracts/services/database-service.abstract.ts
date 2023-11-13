import { PrismaDatabaseService } from 'src/frameworks/databases/prisma/prisma-database.service';
import { IUserRepository } from '../repositories/user-repository.abstract';
import { MongoDatabaseService } from 'src/frameworks/databases/mongo/mongo-database.service';

export abstract class DatabaseServices {
  sql: IPrismaDatabaseService;
  // abstract nosql: MongoDatabaseService;
  // abstract rooms: IRepository<Room>;
  // abstract resources: IRepository<Response>;
  // abstract messages: IRepository<Message>;
}

export abstract class IPrismaDatabaseService {
  abstract user: IUserRepository;
}

export abstract class IMongoDatabaseService {
  abstract user: IUserRepository;
}
