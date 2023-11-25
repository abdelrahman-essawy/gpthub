import { IResourceRepository } from '../repositories';
import { IUserRepository } from '../repositories/user-repository.abstract';

export abstract class DatabaseServices {
  sql?: IPrismaDatabaseService;
  nosql?: IMongoDatabaseService;
  // abstract nosql: MongoDatabaseService;
  // abstract rooms: IRepository<Room>;
  // abstract resources: IRepository<Response>;
  // abstract messages: IRepository<Message>;
}

export abstract class IPrismaDatabaseService {
  abstract user: IUserRepository;
}

export abstract class IMongoDatabaseService {
  // abstract user: IUserRepository;
  abstract resource: IResourceRepository;
}
