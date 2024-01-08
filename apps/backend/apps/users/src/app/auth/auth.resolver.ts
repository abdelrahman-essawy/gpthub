import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../users.service';
import { LoginResponse, LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Resolver(() => UserDto)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => LoginResponse, {
    description: 'Login a user',
  })
  async login(@Args('credentials') credentials: LoginUserDto) {
    const token = await this.authService.login(credentials);
    return new LoginResponse(token);
  }

  @Query(() => UserDto)
  async me(@Args('token') token: string) {
    const user = await this.authService.parseToken(token);
    return this.usersService.findById(user.id);
  }
}
