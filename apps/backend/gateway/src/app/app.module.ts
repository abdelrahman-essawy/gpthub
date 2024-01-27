import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
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
          context: ({ req }) => ({ authorization: req.headers.authorization }),
          cors: {
            origin: '*',
            credentials: true,
          },
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
          buildService({ name, url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                if (context.authorization) {
                  request.http.headers.set(
                    'authorization',
                    context.authorization,
                  );
                  request.http.headers.set('microservice', name);
                }
                request.http.headers.set('microservice', name);

                // pass cookie
                request.http.headers.set(
                  'cookie',
                  context.req?.headers?.cookie,
                );
              },
            });
          },
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
            pollIntervalInMs: 1000,
          }),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
