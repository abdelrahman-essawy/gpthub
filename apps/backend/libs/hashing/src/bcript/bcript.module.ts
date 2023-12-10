import { Module } from '@nestjs/common';
import { BcryptService } from './bcript.service';
import { HashingService } from '@core';
import { HashingModule } from '@backend/hashing';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class BcriptModule implements HashingModule {}
