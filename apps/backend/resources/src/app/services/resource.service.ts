import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ResourceEntity } from '../entities/resource.entity';
import { CreateResource } from '@backend/dtos/resource';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
  ) {}

  async findOne(id: string): Promise<ResourceEntity> {
    return this.resourceRepository.findOne({ where: { id } });
  }

  async findOneByOrFail(
    where: FindOptionsWhere<ResourceEntity>,
  ): Promise<ResourceEntity> {
    return await this.resourceRepository.findOneByOrFail(where);
  }

  async findAll(): Promise<ResourceEntity[]> {
    return this.resourceRepository.find();
  }

  async createOne(resource: CreateResource) {
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

  async removeOne(resource: ResourceEntity): Promise<ResourceEntity> {
    return await this.resourceRepository.remove(resource);
  }

  async deleteMany(resources: ResourceEntity[]): Promise<ResourceEntity[]> {
    return this.resourceRepository.remove(resources);
  }

  async findAllByAuthorId(userId: string) {
    return this.resourceRepository.find({ where: { authorId: userId } });
  }
}
