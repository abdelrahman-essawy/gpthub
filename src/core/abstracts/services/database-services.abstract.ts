import { IUserRepository } from '../repositories/user-repository.abstract';

export abstract class IDatabaseService {
  abstract users: IUserRepository;
  // abstract rooms: IRepository<Room>;
  // abstract resources: IRepository<Response>;
  // abstract messages: IRepository<Message>;
}
