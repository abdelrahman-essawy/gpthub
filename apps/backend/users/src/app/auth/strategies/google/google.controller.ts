import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '@core';

@Controller()
export class GoogleStrategyController {
  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async login() {
    //
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async authCallback(
    @Req()
    req: Request & {
      user: IUser;
    },
  ) {
    return req.user;
  }
}
