import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from 'src/services/database/data-services.module';
import { UserUseCases } from './user.use-case';

@Module({
  imports: [DatabaseServicesModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
