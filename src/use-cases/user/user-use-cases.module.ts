import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-case';
import { DatabaseServicesModule } from 'src/services/databases/databases-service.module';

@Module({
  imports: [DatabaseServicesModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule { }
