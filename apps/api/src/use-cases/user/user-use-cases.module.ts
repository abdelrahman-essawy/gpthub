import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-case';
// import { DatabaseServicesModule } from '../../../../../libs/shared/databases/databases-service.module';
// import { HashingModule } from '../../../../../libs/shared/hashing/hashing.module';
import { DatabaseServicesModule } from 'libs/shared/databases';
import { HashingModule } from 'libs/shared/hashing';
import { KafkaModule } from 'libs/shared/kafka';

@Module({
  imports: [DatabaseServicesModule, HashingModule, KafkaModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule { }
