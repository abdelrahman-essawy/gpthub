import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserDto } from '@backend/dto/user';
import {
  LoginResponse,
  LoginUserDto,
  RegisterResponse,
  RegisterUserDto,
  UserTokenPayload,
} from '@backend/dto/auth';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './decorators/user.decorator';
import { LocalStrategy } from './strategies/local.strategy';

// @UseGuards(RolesGuard)
@UseGuards(AuthGuard)
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
  @UseGuards(LocalStrategy)
  async login(@Args('credentials') credentials: LoginUserDto) {
    console.log(credentials);
    const user = await this.authService.login(credentials);
    const userPayload = new UserTokenPayload(user);
    const token = await this.authService.generateToken(userPayload);
    return new LoginResponse(token, user);
  }

  @Mutation(() => RegisterResponse)
  async register(@Args('userInfo') userInfo: RegisterUserDto) {
    const user = await this.authService.register(userInfo);
    const userPayload = new UserTokenPayload(user);
    const token = await this.authService.generateToken(userPayload);
    return new RegisterResponse(token, user);
  }

  // @Roles([UserRole.ADMIN])
  @Query(() => UserDto)
  async me(@User() user: UserDto) {
    return this.usersService.findById(user.id);
  }
}
