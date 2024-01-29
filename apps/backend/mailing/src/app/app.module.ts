import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  // eslint-disable-next-line no-sparse-arrays
  imports: [ MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465, // Use 587 for TLS
      secure: true, // Use false for TLS
      auth: {
        user: process.env.BOT_EMAIL,
        pass: process.env.BOT_PASS,
      },
    },
    defaults: {
      from: '"No Reply" <no-reply@yourdomain.com>',
    },
    template: {
      dir: process.cwd() + '/template/',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
