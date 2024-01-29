import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IUser } from '@core';
import { JwtGuard, RefreshJwtGuard } from '@backend/guards';
import { UserDto } from '@backend/dto/user';
import {
  LoginResponse,
  LoginUserDto,
  RegisterResponse,
  RegisterUserDto,
} from '@backend/dto/auth';
import { UseGuards } from '@nestjs/common';
import { UserTokenPayload } from '@backend/decorators';

import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { UsersService } from '../users/users.service';

// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard)
@Resolver(() => UserDto)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponse, {
    description:
      'Login a user with username or email and password, returns JWT token.',
  })
  @UseGuards(LocalGuard)
  async login(
    @Args('credentials') credentials: LoginUserDto,
    @UserTokenPayload() user: IUser,
    // @Res({ passthrough: true }) res: Request,
  ): Promise<LoginResponse> {
    const { accessToken, refreshToken } = await this.authService.login(user);

    return new LoginResponse(user, accessToken, refreshToken);
  }

  @Mutation(() => RegisterResponse)
  async register(@Args('userInfo') userInfo: RegisterUserDto) {
    const user = await this.authService.register(userInfo);
    const { accessToken, refreshToken } = await this.authService.login(user);
    return new RegisterResponse(user, accessToken, refreshToken);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(RefreshJwtGuard)
  async refreshToken(
    @UserTokenPayload()
    user: IUser & {
      refreshToken: string;
    },
  ) {
    return this.authService.refreshToken(user, user.refreshToken);
  }

  // @Roles([UserRole.ADMIN])
  // @UseInterceptors(ParseUserFromToken)
  // @UseGuards(LocalGuard)
  @Query(() => UserDto)
  @UseGuards(JwtGuard)
  async me(@UserTokenPayload() user: UserDto) {
    return this.usersService.findById(user.id);
  }
}
