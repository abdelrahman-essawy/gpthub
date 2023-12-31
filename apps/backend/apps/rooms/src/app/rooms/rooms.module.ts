import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './services/room.service';
import { RoomsDatabaseModule } from './rooms-db/rooms-db.module';
import { RoomEntity } from './entities/room.entity';
import { RoomResolver } from './resolvers/room.resolver';

@Module({
  imports: [RoomsDatabaseModule, TypeOrmModule.forFeature([RoomEntity])],
  providers: [RoomResolver, RoomService],
})
export class ResourcesModule {}
