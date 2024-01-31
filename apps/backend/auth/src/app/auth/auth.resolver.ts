import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IUser } from '@core';
import { JwtGuard, RefreshJwtGuard } from '@backend/guards';
import { UserDto } from '@backend/dtos/user';
import {
  LoginResponseDto,
  LoginUserDto,
  RegisterResponse,
  RegisterUserDto,
} from '@backend/dtos/auth';
import { UseGuards } from '@nestjs/common';
import { UserTokenPayload } from '@backend/decorators';

import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { UsersService } from '../../../../users/src/app/users/users.service';
import { GrpcMethod } from '@nestjs/microservices';

// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard)
@Resolver(() => UserDto)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponseDto, {
    description:
      'Login a user with username or email and password, returns JWT token.',
  })
  @UseGuards(LocalGuard)
  async login(
    @Args('credentials') credentials: LoginUserDto,
    @UserTokenPayload() user: IUser,
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
  @GrpcMethod('AuthService', 'Me')
  @UseGuards(JwtGuard)
  async me(@UserTokenPayload() user: UserDto) {
    console.log('me', user);
    return this.usersService.findById(user.id);
  }
}
