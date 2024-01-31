import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLJSONObject } from 'graphql-type-json';

import { AuthModule } from './auth/auth.module';

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

    AuthModule,
  ],
})
export class AppModule {}
