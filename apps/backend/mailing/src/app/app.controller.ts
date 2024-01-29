import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { MailDto } from '../dto/mail.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  sendMail(@Body() mailBody:MailDto){
    return this.appService.sendMail(mailBody);
  }
}
