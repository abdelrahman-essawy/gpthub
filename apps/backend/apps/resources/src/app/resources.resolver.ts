import { Args, Int, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { ResourcesService } from './resources.service';
import { Resource } from './entities/resource.entity';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';
import { User } from './entities/user.local.entity';
import { FieldResolver } from 'type-graphql';

@Resolver(() => [Resource])
export class ResourcesResolver {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Mutation(() => Resource)
  createResource(
    @Args('createResourceInput') createResourceInput: CreateResourceInput
  ) {
    return this.resourcesService.create(createResourceInput);
  }

  @Query(() => [Resource], { name: 'resources' })
  findAll() {
    return this.resourcesService.findAll();
  }

  @Query(() => Resource, { name: 'resource' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.resourcesService.findOne(id);
  }

  @Mutation(() => Resource)
  updateResource(
    @Args('updateResourceInput') updateResourceInput: UpdateResourceInput
  ) {
    return this.resourcesService.update(
      updateResourceInput.id,
      updateResourceInput
    );
  }

  @Mutation(() => Resource)
  removeResource(@Args('id', { type: () => Int }) id: number) {
    return this.resourcesService.remove(id);
  }

  @FieldResolver(() => User)
  author(@Parent() resource: Resource) {
    return { __typename: 'User', id: resource.authorId };
  }
}
