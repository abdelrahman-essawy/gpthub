import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ResourceDto, ResourceUserReferenceDto } from '@backend/dtos/resource';

import { ResourceService } from '../services/resource.service';

@Resolver(() => ResourceUserReferenceDto)
export class UserReferenceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: ResourceUserReferenceDto) {
    return await this.resourceService.findAllByAuthorId(user.id);
  }
}
