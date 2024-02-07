import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { UserReferenceDTO } from './rooms/dto';

import { RoomModule } from './rooms/rooms.module';

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
      },
      buildSchemaOptions: {
        orphanedTypes: [UserReferenceDTO],
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
