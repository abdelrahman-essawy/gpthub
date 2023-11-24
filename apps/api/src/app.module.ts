import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [UserUseCasesModule, PrometheusModule.register()],
  controllers: [AuthController, UserController],
})
export class AppModule { }
