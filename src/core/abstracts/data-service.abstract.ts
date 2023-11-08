import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';
import { IRepository } from './repository.abstract';

export abstract class IDataService {
  abstract users: IRepository<User>;
  abstract rooms: IRepository<Room>;
}
