import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLJSONObject } from 'graphql-type-json';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: ({ req }) => ({ req }),
      resolvers: { JSON: GraphQLJSONObject },
      autoSchemaFile: {
        federation: 2,
        path: join(
          process.cwd(),
          'apps/backend/users/src/users.schema.graphql',
        ),
      },
      playground: true,
      introspection: true,
      csrfPrevention: false,
      buildSchemaOptions: {},
    }),

    UsersModule,
    AuthModule,
    HealthModule,
  ],

  providers: [],

  controllers: [HealthController],
})
export class AppModule {}
