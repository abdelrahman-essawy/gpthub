import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-case';
import { DatabaseServicesModule } from 'src/services/databases/databases-service.module';
import { HashingModule } from 'src/services/hashing/hashing.module';
import { Serializer } from 'src/frameworks/intercetors/serializer.service';

@Module({
  imports: [DatabaseServicesModule, HashingModule],
  providers: [UserUseCases, Serializer],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
