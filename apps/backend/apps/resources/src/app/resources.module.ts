import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesResolver } from './resources.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ResourcesDatabaseModule } from './resources-db/resources-db.module';
import { Resource } from './entities/resource.entity';
import { ResourceAuthorResolver } from './user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'schema.gql',
      },
      buildSchemaOptions: {
        orphanedTypes: [Resource],
      },
    }),
    ResourcesDatabaseModule,
  ],
  providers: [ResourcesResolver, ResourcesService, ResourceAuthorResolver],
})
export class ResourcesModule {}
