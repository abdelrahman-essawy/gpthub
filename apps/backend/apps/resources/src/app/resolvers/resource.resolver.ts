import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import {
  CreateResourceDto,
  ResourceDto,
  UserReferenceDTO,
} from '@backend/dtos';

import { ResourceService } from '../services/resource.service';
import { ResourceEntity } from '../entities/resource.entity';

@Resolver(() => ResourceDto)
export class ResourceResolver {
  constructor(private resourceService: ResourceService) {}

  @Query(() => ResourceDto)
  async getResource(@Args('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Query(() => [ResourceDto])
  async getResources() {
    return this.resourceService.findAll();
  }

  @Query(() => [ResourceDto])
  async similarResources(@Args('id') id: string) {
    const resource = await this.resourceService.findOne(id);
    const resources = await this.resourceService.findAll();
    return resources.filter((r) => r.type === resource.type);
  }

  @Mutation(() => ResourceDto)
  async createResource(@Args('resource') resource: CreateResourceDto) {
    return this.resourceService.createOne(resource);
  }

  // @Mutation(() => ResourceDto)
  // async updateResource(@Args('resource') resource: CreateResourceDto) {
  //   return this.resourceService.updateOne(resource);
  // }

  @Mutation(() => ResourceDto)
  async deleteResource(@Args('id') id: string) {
    return this.resourceService.deleteOne(id);
  }

  @ResolveField(() => UserReferenceDTO)
  async author(@Parent() resource: ResourceEntity) {
    return { __typename: 'User', id: resource.authorId };
  }
}
