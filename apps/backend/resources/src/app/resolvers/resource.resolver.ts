import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import {
  CreateResourceInput,
  ResourceDto,
  UserReferenceDTO,
} from '@backend/dto/resource';
import { User } from '@backend/decorators';
import { IUserTokenPayload } from '@core';
import { ParseUserFromToken } from '@backend/interceptors';

import { ResourceService } from '../services/resource.service';
import { ResourceEntity } from '../entities/resource.entity';

@Resolver(() => ResourceDto)
export class ResourceResolver {
  constructor(private resourceService: ResourceService) {}

  @Query(() => ResourceDto)
  async getOneResource(@Args('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Query(() => [ResourceDto])
  async getAllResources() {
    return this.resourceService.findAll();
  }

  @UseInterceptors(ParseUserFromToken)
  @Mutation(() => ResourceDto)
  async createResource(
    @User() user: IUserTokenPayload,
    @Args('resource')
    resource: CreateResourceInput,
  ) {
    return this.resourceService.createOne({
      ...resource,
      authorId: user.id,
    });
  }

  // @Mutation(() => ResourceDto)
  // async updateResource(@Args('resource') resource: CreateResourceDto) {
  //   return this.resourceService.updateOne(resource);
  // }

  @UseInterceptors(ParseUserFromToken)
  @Mutation(() => String)
  async deleteResource(
    @User() user: IUserTokenPayload,
    @Args('id') id: string,
  ) {
    const resource = await this.resourceService.findOne(id);
    if (resource.authorId !== user.id) {
      throw new Error('You are not the author of this resource');
    }
    return this.resourceService.deleteOne(id);
  }

  @ResolveField(() => UserReferenceDTO)
  async author(@Parent() resource: ResourceEntity) {
    return { __typename: 'User', id: resource.authorId };
  }
}
