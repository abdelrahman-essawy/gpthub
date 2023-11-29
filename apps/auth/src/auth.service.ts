import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DatabaseServices, IHashingService } from 'core/abstracts';
import { AuthenticateUserDto, CreateUserDto, UpdateUserDto } from 'core/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseServices,
    private readonly hashingService: IHashingService,
  ) { }

  async commonConflictValidation(
    userDto: CreateUserDto | UpdateUserDto | any, // fix any
  ): Promise<void> {
    try {
      const usernamePromise = userDto.username
        ? this.databaseService.sql.user.isUsernameExists(userDto.username)
        : Promise.resolve(false);

      const emailPromise = userDto.email
        ? this.databaseService.sql.user.isEmailExists(userDto.email)
        : Promise.resolve(false);

      const [isUsernameExists, isEmailExists] = await Promise.all([
        usernamePromise,
        emailPromise,
      ]);

      if (isUsernameExists && isEmailExists) {
        throw new ConflictException({
          message: 'Username and email already exists',
        });
      }

      if (isUsernameExists) {
        throw new ConflictException({ message: 'Username already exists' });
      }

      if (isEmailExists) {
        throw new ConflictException({ message: 'Email already exists' });
      }
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  /**
   * Authenticates a user.
   * @param createUserDto - User data to authenticate a user.
   * @returns A Promise resolving to the authenticated user.
   * @throws NotAcceptableException if the email or username already exists.
   */
  async authenticate(credentials: AuthenticateUserDto): Promise<any> {
    const user = await this.databaseService.sql.user.findByUsernameOrEmail(
      credentials.usernameOrEmail,
    );

    if (!user) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    const isPasswordMatched = await this.hashingService.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    return ['token'];
  }

  /**
   * Creates a new user.
   * @param createUserDto - User data to create a new user.
   * @returns A Promise resolving to the created user.
   * @throws NotAcceptableException if the email or username already exists.
   */
  async register(createUserDto: CreateUserDto): Promise<any> {
    await this.commonConflictValidation(createUserDto);
    const user = await this.databaseService.sql.user.create({
      ...createUserDto,
      password: await this.hashingService.hash(createUserDto.password),
    });

    if (!user) {
      throw new BadRequestException({ message: 'User not created' });
    }

    // const test = await this.producerService.produce({
    //   topic: 'RESOURCE_PROCESS',
    //   messages: [
    //     {
    //       key: 'user',
    //       value: JSON.stringify(user),
    //     },
    //   ],
    // });

    return {
      message: 'User created successfully',
      token: 'token',
    };
  }
}
