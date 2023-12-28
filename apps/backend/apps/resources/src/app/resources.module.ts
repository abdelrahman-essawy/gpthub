import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ResourcesDatabaseModule } from './resources-db/resources-db.module';
import { ResourceEntity } from './entities/resource.entity';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ResourceDto } from './dto/resource.dto';
import { CreateResourceDto } from './dto/create-resource.dto';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: 'apps/backend/apps/resources/src/schema.gql',
      },
      buildSchemaOptions: {
        orphanedTypes: [ResourceDto],
      },
      playground: {
        settings: {
          'request.credentials': 'include', // Allow credentials in Playground
        },
      },
    }),
    ResourcesDatabaseModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ResourceEntity])],
      resolvers: [
        {
          EntityClass: ResourceEntity,
          DTOClass: ResourceDto,
          CreateDTOClass: CreateResourceDto,

          referenceBy: {
            key: 'id',
          },
        },
      ],
    }),
  ],
})
export class ResourcesModule {}
