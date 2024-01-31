import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLJSONObject } from 'graphql-type-json';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: ({ req }) => ({ req }),
      resolvers: { JSON: GraphQLJSONObject },
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {},
    }),
  ],
})
export class AppModule {}
