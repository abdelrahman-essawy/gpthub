import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ResourceDto, UserReferenceDTO } from '@backend/dtos/resource';

import { ResourceService } from '../services/resource.service';

@Resolver(() => UserReferenceDTO)
export class UserReferenceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: UserReferenceDTO) {
    return await this.resourceService.findAllByAuthorId(user.id);
  }
}
