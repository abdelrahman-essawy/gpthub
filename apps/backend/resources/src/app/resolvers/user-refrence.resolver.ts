import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ResourceDto, UserDto } from '@backend/dtos/resource';

import { ResourceService } from '../services/resource.service';

@Resolver(() => UserDto)
export class UserReferenceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: UserDto) {
    return await this.resourceService.findAllByAuthorId(user.id);
  }
}
