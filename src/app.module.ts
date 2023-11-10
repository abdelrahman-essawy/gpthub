import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';
import { DatabaseServicesModule } from './services/database/database-services.module';

@Module({
  imports: [DatabaseServicesModule, UserUseCasesModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
