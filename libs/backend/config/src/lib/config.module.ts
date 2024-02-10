import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as process from 'process';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,

      envFilePath: '.env.prod',
    }),
  ],
  providers: [ConfigService, Logger],
  exports: [ConfigService],
})
export class ConfigModule implements OnModuleInit {
  constructor(private readonly logger: Logger) {}

  onModuleInit() {
    this.logger.warn(
      'ConfigModule has been initialized in NODE_ENV = ' +
        process.env['NODE_ENV'],
    );
  }
}
