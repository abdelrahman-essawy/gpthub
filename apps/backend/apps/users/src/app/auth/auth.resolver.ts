import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { LoginResponse, LoginUserDto, userTokenPayload } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterResponse, RegisterUserDto } from './dto/register.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './decorators/ user.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from '@core';
import { RolesGuard } from '../guards/roles.guard';
import { LocalStrategy } from './strategies/local.strategy';

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
    const userPayload = new userTokenPayload(user);
    const token = await this.authService.generateToken(userPayload);
    return new LoginResponse(token, user);
  }

  @Mutation(() => RegisterResponse)
  async register(@Args('userInfo') userInfo: RegisterUserDto) {
    const user = await this.authService.register(userInfo);
    const userPayload = new userTokenPayload(user);
    const token = await this.authService.generateToken(userPayload);
    return new RegisterResponse(token, user);
  }

  @UseGuards(AuthGuard)
  @Roles([UserRole.ADMIN, UserRole.USER])
  @UseGuards(RolesGuard)
  @Query(() => UserDto)
  async me(@User() user: UserDto) {
    return this.usersService.findById(user.id);
  }
}
