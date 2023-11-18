import { Injectable } from '@nestjs/common';
import { IHashingService } from 'apps/api/src/core/abstracts/services/hashing.abstract';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IHashingService {
  hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
  compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
