import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserReferenceDTO } from '../dto/user-refrence.dto';
import { ResourceService } from '../services/resource.service';
import { ResourceDto } from '../dto/resource.dto';

@Resolver(() => UserReferenceDTO)
export class UserReferenceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: UserReferenceDTO) {
    return await this.resourceService.findAllByAuthorId(user.id);
  }
}
