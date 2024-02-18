import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '@core';

@Controller()
export class GithubStrategyController {
  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {
    //
  }

  @Get('auth/github/callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(
    @Req()
    req: Request & {
      user: IUser;
    },
  ) {
    return req.user;
  }
}
