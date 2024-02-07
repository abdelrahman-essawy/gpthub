import { Resolver } from '@nestjs/graphql';
import { UserDto } from '../dto';
import { UsersService } from '../users.service';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Roles([UserRole.ADMIN])
  // @UseInterceptors(ParseUserFromToken)
  // @UseGuards(LocalGuard)
  // @Query(() => UserDto)
  // @UseGuards(JwtGuard)
  // async me(@UserTokenPayload() user: UserDto) {
  //   return this.usersService.findById(user.id);
  // }
}
