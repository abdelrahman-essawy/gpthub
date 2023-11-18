import { Module } from '@nestjs/common';
import { BcryptService } from './bcript.service';
import { IHashingService } from 'apps/api/src/core/abstracts/services/hashing.abstract';
import { HashingModule } from 'apps/api/src/services/hashing/hashing.module';

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
