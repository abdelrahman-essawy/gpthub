import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ForbiddenException, UseGuards } from '@nestjs/common';

import {
  CreateResourceInput,
  ResourceDto,
  UserReferenceDTO,
} from '@backend/dtos/resource';
import { IUserTokenPayload, UserRole } from '@core';
import { UserTokenPayload } from '@backend/decorators';
import { JwtGuard } from '@backend/guards';
import { DeleteResponse } from '@backend/dtos/shared';

import { ResourceService } from '../services/resource.service';
import { ResourceEntity } from '../entities/resource.entity';

@UseGuards(JwtGuard)
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

  @Mutation(() => ResourceDto)
  async createResource(
    @UserTokenPayload() user: IUserTokenPayload,
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

  @Mutation(() => DeleteResponse)
  async deleteResource(
    @UserTokenPayload() user: IUserTokenPayload,
    @Args('id') id: string,
  ) {
    const resource = await this.resourceService.findOneByOrFail(id);
    if (resource.authorId === user.id || user.role === UserRole.ADMIN) {
      await this.resourceService.removeOne(resource);
      return new DeleteResponse('Resource deleted successfully.');
    }
    throw new ForbiddenException('You are not the author of this resource');
  }

  @ResolveField(() => UserReferenceDTO)
  async author(@Parent() resource: ResourceEntity) {
    return { __typename: 'User', id: resource.authorId };
  }
}
