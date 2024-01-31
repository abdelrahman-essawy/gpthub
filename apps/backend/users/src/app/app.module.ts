import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLJSONObject } from 'graphql-type-json';

import { UsersModule } from './users/users.module';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: ({ req }) => ({ req }),
      resolvers: { JSON: GraphQLJSONObject },
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {},
    }),

    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: 'apps/backend/auth/src/proto/auth.proto',
          url: `localhost:${process.env.GRPC_AUTH_PORT ?? 50005}`,
        },
      },
    ]),

    UsersModule,
  ],

  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (client: ClientGrpc) => client.getService('AuthService'),
      inject: ['AUTH_PACKAGE'],
    },
  ],
})
export class AppModule {}
