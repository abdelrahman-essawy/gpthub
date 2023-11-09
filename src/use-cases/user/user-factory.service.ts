import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class UserFactoryService {
  constructor() {}
  createNewUser(dto: CreateUserDto) {
    const user = new User();
    // user.username = dto.username;
    // user.firstName = dto.firstName;
    // user.lastName = dto.lastName;
    // user.email = dto.email;
    // user.password = dto.password;
    return user;
  }
}
