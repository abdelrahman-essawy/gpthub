import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashingService } from 'core/abstracts';

@Injectable()
export class BcryptService implements IHashingService {
  hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
  compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
