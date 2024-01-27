import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserDto } from '@backend/dto/user';
import {
  LoginResponse,
  LoginUserDto,
  RegisterResponse,
  RegisterUserDto,
} from '@backend/dto/auth';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { LocalGuard } from './guards/local.guard';
import { IUser } from '@core';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';

// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard)
@Resolver(() => UserDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse, {
    description:
      'Login a user with username or email and password, returns JWT token.',
  })
  @UseGuards(LocalGuard)
  async login(
    @Args('credentials') credentials: LoginUserDto,
    @User() user: IUser,
    // @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const { accessToken, refreshToken } = await this.authService.login(user);
    // console.log('res', res.cookie('accessToken', accessToken));
    // res.cookie('accessToken', accessToken, {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   secure: true,
    // });
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   secure: true,
    // });
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
    @User()
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
  async me(@User() user: UserDto) {
    return user;
  }
}
