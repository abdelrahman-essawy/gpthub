import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IUser, IUserTokenPayload } from '@core';
import { JwtGuard, RefreshJwtGuard } from '@backend/guards';
import { UserDto } from '../users/dto';
import {
  LoginResponseDto,
  LoginUserDto,
  RegisterResponse,
  RegisterUserDto,
} from './dto';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '@backend/decorators';

import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard)
@Resolver(() => UserDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto, {
    description:
      'Login a user with username or email and password, returns JWT token.',
  })
  @UseGuards(LocalGuard)
  async login(
    @Args('credentials') credentials: LoginUserDto,
    @CurrentUser() user: IUser,
    // @Res({ passthrough: true }) res: Request,
  ): Promise<LoginResponseDto> {
    const { accessToken, refreshToken } = await this.authService.login(user);

    return new LoginResponseDto(user, accessToken, refreshToken);
  }

  @Mutation(() => RegisterResponse)
  async register(@Args('userInfo') userInfo: RegisterUserDto) {
    const user = await this.authService.register(userInfo);
    const { accessToken, refreshToken } = await this.authService.login(user);
    return new RegisterResponse(user, accessToken, refreshToken);
  }

  @Mutation(() => LoginResponseDto)
  @UseGuards(RefreshJwtGuard)
  async refreshToken(
    @CurrentUser()
    user: IUser & {
      refreshToken: string;
    },
  ) {
    return this.authService.refreshToken(user, user.refreshToken);
  }

  @Query(() => UserDto)
  @UseGuards(JwtGuard)
  async me(@CurrentUser() user: IUserTokenPayload) {
    return user;
  }
}
