import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '@backend/dtos/user';
import { UsersService } from '../users.service';
import { JwtGuard } from '@backend/guards';
import { UserTokenPayload } from '@backend/decorators';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Roles([UserRole.ADMIN])
  // @UseInterceptors(ParseUserFromToken)
  // @UseGuards(LocalGuard)
  @Query(() => UserDto)
  @UseGuards(JwtGuard)
  async me(@UserTokenPayload() user: UserDto) {
    return this.usersService.findById(user.id);
  }
}
