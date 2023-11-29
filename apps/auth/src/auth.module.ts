import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseServicesModule } from 'libs/shared/databases';
import { HashingModule } from 'libs/shared/hashing';

@Module({
  imports: [DatabaseServicesModule, HashingModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
