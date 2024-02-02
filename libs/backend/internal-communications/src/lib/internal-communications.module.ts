import { Module } from '@nestjs/common';
import { InternalGrpcModule } from './grpc/internal-grpc.module';
import { InternalGrpcService } from './grpc/internal-grpc.service';
import { InternalCommunicationsService } from './internal-communications.service';

@Module({
  imports: [InternalGrpcModule],
  providers: [InternalGrpcService, InternalCommunicationsService],
  exports: [InternalGrpcService, InternalCommunicationsService],
})
export class InternalCommunicationsModule {}
