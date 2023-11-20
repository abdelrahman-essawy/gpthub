import { Module } from '@nestjs/common';
import { BcryptService } from './bcript.service';
import { HashingModule } from 'apps/api/src/services/hashing/hashing.module';
import { IHashingService } from 'core/abstracts';

@Module({
  providers: [
    {
      provide: IHashingService,
      useClass: BcryptService,
    },
  ],
  exports: [
    {
      provide: IHashingService,
      useClass: BcryptService,
    },
  ],
})
export class BcriptModule implements HashingModule { }
