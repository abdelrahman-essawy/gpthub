import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingService } from '@core';

@Injectable()
export class BcryptService implements HashingService {
  hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
