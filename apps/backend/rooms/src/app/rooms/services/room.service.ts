import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../entities/room.entity';
import { CreateRoom } from '@backend/dtos/room';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async find(options?: FindManyOptions<RoomEntity>): Promise<RoomEntity[]> {
    return this.roomRepository.find(options);
  }

  async createOne(room: CreateRoom): Promise<RoomEntity> {
    const newRoom = this.roomRepository.create(room);
    return this.roomRepository.save(newRoom);
  }

  async findOne(options?: FindManyOptions<RoomEntity>): Promise<RoomEntity> {
    return this.roomRepository.findOne(options);
  }

  async findOneByOrFail(
    where: FindOptionsWhere<RoomEntity> | FindOptionsWhere<RoomEntity>[],
  ): Promise<RoomEntity> {
    return this.roomRepository.findOneByOrFail(where);
  }

  async findAllByAuthorId(userId: string) {
    return this.roomRepository.find({ where: { authorId: userId } });
  }

  async removeOne(resource: RoomEntity) {
    return this.roomRepository.remove(resource);
  }
}
