import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { CRUDResolver } from '@ptc-org/nestjs-query-graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './auth/dto/login.dto';
import { AuthService } from './auth/auth.service';

@Resolver(() => UserDto)
export class UsersResolver extends CRUDResolver(UserEntity) {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super(usersService);
  }

  @Mutation(() => UserDto)
  async login(@Args() credentials: LoginUserDto) {
    return this.authService.login(credentials);
  }

  @Query(() => UserDto)
  async me() {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
    };
  }
}
