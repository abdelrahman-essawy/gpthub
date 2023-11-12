import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticateUserDto, CreateUserDto } from 'src/core/dtos/user.dto';
import { UserUseCases } from 'src/use-cases/user/user.use-case';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userUseCases: UserUseCases) { }

  @Post('signup')
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data to create a user',
  })
  @ApiResponse({ status: 201, description: 'Creates a user' })
  async create(@Body() data: CreateUserDto): Promise<any> {
    return await this.userUseCases.register(data);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiBody({
    type: AuthenticateUserDto,
    description: 'User data to authenticate a user',
  })
  @ApiResponse({ status: 200, description: 'Authenticates a user' })
  async authenticate(@Body() credentials: AuthenticateUserDto): Promise<any> {
    return await this.userUseCases.authenticate(credentials);
  }
}
