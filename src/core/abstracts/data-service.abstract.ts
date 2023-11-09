import { Message } from '../entities/message.entity';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';
import { IRepository } from './repository.abstract';
import { IUserRepository } from './user-repository.abstract';

export abstract class IDatabaseService {
  abstract users: IUserRepository;
  // abstract rooms: IRepository<Room>;
  // abstract resources: IRepository<Response>;
  // abstract messages: IRepository<Message>;
}
