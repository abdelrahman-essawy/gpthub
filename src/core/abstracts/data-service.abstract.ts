import { Message } from '../entities/message.entity';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';
import { IRepository } from './repository.abstract';

export abstract class IDatabaseService {
  abstract users: IRepository<User>;
  // abstract rooms: IRepository<Room>;
  // abstract resources: IRepository<Response>;
  // abstract messages: IRepository<Message>;
}
