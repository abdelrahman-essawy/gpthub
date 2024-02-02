import { InternalGrpcService } from './grpc/internal-grpc.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InternalCommunicationsService {
  constructor(public readonly grpc: InternalGrpcService) {}
}
