import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLJSONObject } from 'graphql-type-json';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: ({ req }) => ({ req }),
      resolvers: { JSON: GraphQLJSONObject },
      autoSchemaFile: {
        federation: 2,
        path: 'apps/backend/apps/users/src/schema.gql',
      },
      buildSchemaOptions: {},
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
