import { Module } from '@nestjs/common';
import { BcriptModule } from 'frameworks/hashing';

@Module({
  imports: [BcriptModule],
  exports: [BcriptModule],
})
export class HashingModule { }
