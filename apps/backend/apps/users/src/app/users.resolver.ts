import { Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';

@Resolver(() => UserDto)
export class UsersResolver {
  // @ResolveReference()
  // async resolveReference(reference: {
  //   __typename: string;
  //   authorId: string;
  // }): Promise<UserDto> {
  //   return this.usersService.findOne(reference.authorId);
  // }
}
