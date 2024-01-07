import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        server: {
          autoTransformHttpErrors: true,
          sortSchema: true,
          // formatError: (err) => ({
          //   code: err.extensions.code,
          //   message: err.message,
          //   serverName: err.extensions.serviceName,
          // }),
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          playground: false,
        },
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'users-microservice',
                url: configService.get<string>('USERS_MICROSERVICES_URL'),
              },
              {
                name: 'resources-microservice',
                url: configService.get<string>('RESOURCES_MICROSERVICES_URL'),
              },
              {
                name: 'rooms-microservice',
                url: configService.get<string>('ROOMS_MICROSERVICES_URL'),
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
