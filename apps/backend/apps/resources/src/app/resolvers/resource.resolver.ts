import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ResourceDto } from '../dto/resource.dto';
import { ResourceService } from '../services/resource.service';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UserReferenceDTO } from '../dto/user-refrence.dto';
import { ResourceEntity } from '../entities/resource.entity';

@Resolver(() => ResourceDto)
export class ResourceResolver {
  constructor(private resourceService: ResourceService) {}

  @Query(() => ResourceDto)
  async resource(@Args('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Query(() => [ResourceDto])
  async resources() {
    return this.resourceService.findAll();
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
