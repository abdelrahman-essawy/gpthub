import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ResourceEntity } from '../entities/resource.entity';
import { CreateResourceDto } from '@backend/dto/resource';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
  ) {}

  async findOne(id: string): Promise<ResourceEntity> {
    return this.resourceRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<ResourceEntity[]> {
    return this.resourceRepository.find();
  }

  async createOne(resource: CreateResourceDto) {
    // const user = this.communicationService.internal.grpc.auth.me(token);
    // const user = this.communicationService.internal.kafka.mailer.send(
    //   user.email,
    // );
    return this.resourceRepository.save(resource);
  }

  async createMany(resources: ResourceEntity[]): Promise<ResourceEntity[]> {
    return this.resourceRepository.save(resources);
  }

  // async updateOne(resource: UpdateResourceDto): Promise<ResourceEntity> {
  //   return this.resourceRepository.save(resource);
  // }

  async updateMany(resources: ResourceEntity[]): Promise<ResourceEntity[]> {
    return this.resourceRepository.save(resources);
  }

  async deleteOne(id: string) {
    return this.resourceRepository.delete({ id });
  }

  async deleteMany(resources: ResourceEntity[]): Promise<ResourceEntity[]> {
    return this.resourceRepository.remove(resources);
  }

  async findAllByAuthorId(userId: string) {
    return this.resourceRepository.find({ where: { authorId: userId } });
  }
}
