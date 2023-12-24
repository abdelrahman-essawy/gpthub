import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersDatabaseModule } from '../../../../libs/database/src/users-db/users-db.module';
import { HashingModule } from '@backend/hashing';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UsersDatabaseModule,
    HashingModule,
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
