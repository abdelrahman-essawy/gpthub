import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';
import { DatabaseServicesModule } from './services/databases/databases-service.module';
import { AuthController } from './controllers/auth.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [DatabaseServicesModule, UserUseCasesModule],
  controllers: [AuthController, UserController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule { }
