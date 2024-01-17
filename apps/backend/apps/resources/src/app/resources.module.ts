import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserReferenceDTO } from '@backend/dtos';

import { ResourceResolver } from './resolvers/resource.resolver';
import { ResourceService } from './services/resource.service';
import { ResourceEntity } from './entities/resource.entity';
import { ResourcesDatabaseModule } from './resources-db/resources-db.module';
import { UserReferenceResolver } from './resolvers/user-refrence.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'apps/backend/apps/resources/src/schema.gql',
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
    ResourcesDatabaseModule,
    TypeOrmModule.forFeature([ResourceEntity]),
  ],
  providers: [ResourceResolver, ResourceService, UserReferenceResolver],
})
export class ResourcesModule {}
