import { Resolver } from '@nestjs/graphql';
import { UserModel } from './models/user.model';

@Resolver(() => UserModel)
export class UsersResolver {
  // @ResolveReference()
  // async resolveReference(reference: {
  //   __typename: string;
  //   authorId: string;
  // }): Promise<UserModel> {
  //   return this.usersService.findOne(reference.authorId);
  // }
}
