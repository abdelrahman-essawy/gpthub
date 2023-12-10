import { Module } from '@nestjs/common';
import { BcryptService } from '../bcript';
import { HashingService } from '@core';

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
export class HashingModule {}
