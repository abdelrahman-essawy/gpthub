import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { ResourcesModule } from 'apps/resources/src/resources.module';

@Module({
  imports: [UserUseCasesModule, ResourcesModule],
  controllers: [AuthController, UserController],
})
export class AppModule { }
