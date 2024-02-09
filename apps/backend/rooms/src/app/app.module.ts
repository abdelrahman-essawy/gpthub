import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { UserDto } from './rooms/dto';

import { RoomModule } from './rooms/rooms.module';
import { join } from 'path';

@Module({
  imports: [
    RoomModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      context: ({ req }) => {
        return { req };
      },
      autoSchemaFile: {
        federation: 2,
        path: join(
          process.cwd(),
          'apps/backend/rooms/src/rooms.schema.graphql',
        ),
      },
      buildSchemaOptions: {
        orphanedTypes: [UserDto],
      },
      playground: {
        settings: {
          'request.credentials': 'include', // Allow credentials in Playground
        },
      },
    }),
  ],
})
export class AppModule {}
