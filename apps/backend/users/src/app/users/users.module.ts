import { Module } from '@nestjs/common';
import { HashingModule } from '@backend/hashing';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersDatabaseModule } from '../config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './resolvers/users.resolver';
import { GuardsModule } from '@backend/guards';

@Module({
  imports: [
    // NestjsQueryGraphQLModule.forFeature({
    //   imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
    //   resolvers: [
    //     {
    //       DTOClass: UserDto,
    //       EntityClass: UserEntity,
    //       pagingStrategy: PagingStrategies.NONE,
    //       create: { disabled: true },
    //       update: { disabled: true },
    //
    //       referenceBy: { key: 'id' },
    //     },
    //   ],
    // }),
    TypeOrmModule.forFeature([UserEntity]),

    HashingModule,
    GuardsModule,

    UsersDatabaseModule,
  ],
  controllers: [],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
