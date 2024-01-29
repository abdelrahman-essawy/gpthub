import { forwardRef, Module } from '@nestjs/common';
import { HashingModule } from '@backend/hashing';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { UserDto } from '@backend/dto/user';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { AuthResolver } from '../auth/auth.resolver';
import { UsersDatabaseModule } from '../config/database.module';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      resolvers: [
        {
          DTOClass: UserDto,
          EntityClass: UserEntity,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          update: { disabled: true },

          referenceBy: { key: 'id' },
        },
      ],
    }),

    HashingModule,

    forwardRef(() => AuthModule),
    UsersDatabaseModule,
  ],
  providers: [UsersService, AuthResolver],
  exports: [UsersService],
})
export class UsersModule {}
