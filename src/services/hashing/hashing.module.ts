import { Module } from '@nestjs/common';
import { BcriptModule } from 'src/frameworks/hashing/bcript/bcript.module';

@Module({
  imports: [BcriptModule],
  exports: [BcriptModule],
})
export class HashingModule { }
