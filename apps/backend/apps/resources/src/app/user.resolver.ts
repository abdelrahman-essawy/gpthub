import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ResourcesService } from './resources.service';
import { Resource } from './entities/resource.entity';
import { User } from './entities/user.local.entity';

@Resolver((of) => User)
export class ResourceAuthorResolver {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ResolveField(() => [Resource])
  resources(@Parent() user: User) {
    return this.resourcesService.findForAuthor(user.id);
  }
}
