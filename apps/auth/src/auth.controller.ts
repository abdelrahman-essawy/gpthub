import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, AuthenticateUserDto } from 'core/dtos';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data to create a user',
  })
  @ApiResponse({ status: 201, description: 'Creates a user' })
  async create(@Body() data: CreateUserDto): Promise<any> {
    return await this.authService.register(data);
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
    return await this.authService.authenticate(credentials);
  }
}
