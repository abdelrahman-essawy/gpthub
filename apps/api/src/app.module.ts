import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ResourcesController } from './controllers/resources.controller';

@Module({
  imports: [UserUseCasesModule, PrometheusModule.register()],
  controllers: [AuthController, UserController, ResourcesController],
})
export class AppModule { }
