import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../entities/room.entity';
import { CreateRoomDto } from '../../../../../../../libs/backend/dto/room/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async findOne(id: string): Promise<RoomEntity> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }

  async createOne(resource: CreateRoomDto) {
    return this.roomRepository.save(resource);
  }

  async createMany(resources: RoomEntity[]): Promise<RoomEntity[]> {
    return this.roomRepository.save(resources);
  }

  // async updateOne(resource: UpdateResourceDto): Promise<RoomEntity> {
  //   return this.roomRepository.save(resource);
  // }

  async updateMany(resources: RoomEntity[]): Promise<RoomEntity[]> {
    return this.roomRepository.save(resources);
  }

  async deleteOne(id: string) {
    return this.roomRepository.delete({ id });
  }

  async deleteMany(resources: RoomEntity[]): Promise<RoomEntity[]> {
    return this.roomRepository.remove(resources);
  }

  async findAllByAuthorId(userId: string) {
    return this.roomRepository.find({ where: { authorId: userId } });
  }
}
