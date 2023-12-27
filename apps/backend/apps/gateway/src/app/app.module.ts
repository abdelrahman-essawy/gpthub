import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import * as process from 'process';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        autoTransformHttpErrors: true,
        sortSchema: true,
        // formatError: (err) => ({
        //   code: err.extensions.code,
        //   message: err.message,
        //   serverName: err.extensions.serviceName,
        // }),
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'users-microservice',
              url: process.env.USERS_MICROSERVICES_URL,
            },
            {
              name: 'resources-microservice',
              url: process.env.RESOURCES_MICROSERVICES_UR,
            },
          ],
          subgraphHealthCheck: true,
          logger: console,
          pollIntervalInMs: 1000,
          introspectionHeaders: {
            'x-api-key': '123',
          },
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
