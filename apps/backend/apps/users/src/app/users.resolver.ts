import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async findAllUsers(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Number, defaultValue: 10 }) pageSize: number
  ) {
    const users = this.usersService.findAll();
    const metadata = this.usersService.paginate({
      page,
      limit: pageSize,
      route: 'http://localhost:3000/graphql', // TODO: Make this dynamic
    });
    return { users, metadata };
  }

  @Query(() => User)
  async findOneUser(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  // @UseGuards(AuthGuard) // Add authentication guard
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    // Add input validation
    // Validate createUserInput properties (e.g., email format, password strength)
    return this.usersService.create(createUserInput);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    authorId: string;
  }): Promise<User> {
    return this.usersService.findOne(reference.authorId);
  }
}
