import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { UsersDatabaseModule } from './users-db/users-db.module';
import { HashingModule } from '@backend/hashing';
import { GraphQLJSONObject } from 'graphql-type-json';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { PagingStrategies } from '@ptc-org/nestjs-query-graphql/src/types';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      resolvers: { JSON: GraphQLJSONObject },
      autoSchemaFile: {
        federation: 2,
        path: 'apps/backend/apps/users/src/schema.gql',
      },
      buildSchemaOptions: {},
      playground: {
        settings: {
          'request.credentials': 'include', // Allow credentials in Playground
        },
      },
    }),
    UsersDatabaseModule,
    HashingModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      resolvers: [
        {
          EntityClass: UserEntity,
          DTOClass: UserDto,
          CreateDTOClass: CreateUserDto,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.NONE,

          referenceBy: {
            key: 'id',
          },
        },
      ],
    }),
  ],
})
export class UsersModule {}
