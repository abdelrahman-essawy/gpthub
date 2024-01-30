import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrategiesModule } from '@backend/strategies';
import { UserReferenceDTO } from '@backend/dtos/resource';

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

    StrategiesModule,

    ResourcesDatabaseModule,
    TypeOrmModule.forFeature([ResourceEntity]),
  ],
  providers: [ResourceResolver, ResourceService, UserReferenceResolver],
})
export class ResourcesModule {}
