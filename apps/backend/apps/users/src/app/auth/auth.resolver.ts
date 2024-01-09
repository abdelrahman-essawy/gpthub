import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { LoginResponse, LoginUserDto, TokenPayload } from './dto/login.dto';
import { AuthService } from './auth.service';

@Resolver(() => UserDto)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => LoginResponse, {
    description:
      'Login a user with username or email and password, returns JWT token.',
  })
  async login(@Args('credentials') credentials: LoginUserDto) {
    const user = await this.authService.login(credentials);
    const tokenPayload = new TokenPayload(user);
    const token = await this.authService.generateToken({ tokenPayload });
    return new LoginResponse(token, user);
  }

  @Query(() => UserDto)
  async me(@Args('token') token: string) {
    const user = await this.authService.parseUserFromToken(token);
    return this.usersService.findById(user.id);
  }
}
