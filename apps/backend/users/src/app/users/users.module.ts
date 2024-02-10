import { Module } from '@nestjs/common';
import { HashingModule } from '@backend/hashing';
import { GuardsModule } from '@backend/guards';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersDatabaseModule } from './database/database.module';

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
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
