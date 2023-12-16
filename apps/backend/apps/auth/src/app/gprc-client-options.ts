import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_PACKAGE_NAME } from '@backend/generated';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5000',
    package: AUTHENTICATION_PACKAGE_NAME,
    protoPath: 'libs/core/proto/src/auth/auth.proto',
  },
};
export const grpcClientOptions: GrpcOptions =
  addReflectionToGrpcConfig(grpcOptions);
