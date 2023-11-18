import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-case';
import { DatabaseServicesModule } from '../../services/databases/databases-service.module';
import { HashingModule } from '../../services/hashing/hashing.module';

@Module({
  imports: [DatabaseServicesModule, HashingModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule { }
