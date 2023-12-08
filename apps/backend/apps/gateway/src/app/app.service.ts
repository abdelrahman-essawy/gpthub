import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@backend/database';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {
  }
  getData(): { message: string } {
    return {
      message: `Hellossadaasd ${this.databaseService.getData().message}`,
    }
  }
}
