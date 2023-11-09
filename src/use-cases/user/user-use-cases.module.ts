import { Module } from '@nestjs/common';
import { DatabaseServicesModule } from 'src/services/data-services/data-services.module';
import { UserUseCases } from './user.use-case';
import { UserFactoryService } from './user-factory.service';

@Module({
  imports: [DatabaseServicesModule],
  providers: [UserUseCases, UserFactoryService],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
