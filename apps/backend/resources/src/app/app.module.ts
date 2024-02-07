import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrategiesModule } from '@backend/strategies';

import { ResourceResolver } from './resolvers/resource.resolver';
import { ResourceService } from './services/resource.service';
import { ResourceEntity } from './entities/resource.entity';
import { ResourcesDatabaseModule } from './resources-db/resources-db.module';
import { UserReferenceResolver } from './resolvers/user-refrence.resolver';
import { join } from 'path';
import { ResourceUserReferenceDto } from '@backend/dtos/resource';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(
          process.cwd(),
          'apps/backend/resources/src/resources.schema.graphql',
        ),
      },
      buildSchemaOptions: {
        orphanedTypes: [ResourceUserReferenceDto],
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
export class AppModule {}
