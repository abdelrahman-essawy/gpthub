import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { UserReferenceDTO } from '@backend/dto/room';
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
        path: 'apps/backend/apps/rooms/src/schema.gql',
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
