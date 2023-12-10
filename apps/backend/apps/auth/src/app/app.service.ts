import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@backend/database';

@Injectable()
export class AppService {
  constructor(private readonly databaseService:DatabaseService) {}

  login(): string {
    return this.databaseService.getData().message
  }
  register(): string {
    return "YES"
  }
}
