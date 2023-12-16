import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_PACKAGE_NAME, AUTHENTICATION_SERVICE_NAME } from '@global/proto';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTHENTICATION_PACKAGE_NAME,
          protoPath: 'libs/proto/grpc/auth/auth.proto'
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
