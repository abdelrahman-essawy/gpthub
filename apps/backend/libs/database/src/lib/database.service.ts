import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  getData(): { message: string } {
    return { message: 'Hello From Database!' };
  }
}
