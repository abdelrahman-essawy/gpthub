import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

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
              url: 'http://localhost:3001/graphql',
            },
            // {
            //   name: 'messages',
            //   url: 'http://localhost:3002/graphql',
            // },
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
