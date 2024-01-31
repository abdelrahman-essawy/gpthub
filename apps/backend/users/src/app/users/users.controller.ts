import { Controller, UseGuards } from '@nestjs/common';
import { UserDto } from '@backend/dtos/user';
import { JwtGuard } from '@backend/guards';
import { UserTokenPayload } from '@backend/decorators';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  async me(@UserTokenPayload() user: UserDto) {
    return this.usersService.findById(user.id);
  }
}
