import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceProcessingService {
  getHello(): string {
    return 'Hello World!';
  }
}
