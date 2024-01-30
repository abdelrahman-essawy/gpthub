import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
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

  async findOne(id: string): Promise<RoomEntity> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }

  async createOne(resource: CreateRoom) {
    const room = this.roomRepository.create(resource);
    return this.roomRepository.save(room);
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

  async findAllByModeratorId(userId: string) {
    return this.roomRepository.find({ where: { moderatorIds: userId } });
  }
}
