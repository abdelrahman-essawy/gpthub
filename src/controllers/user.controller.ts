import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { User } from 'src/core/entities/user.entity';
import { UserUseCases } from 'src/use-cases/user/user.use-case';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) { }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Retrieves all users' })
  async getAll(): Promise<any> {
    return await this.userUseCases.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Retrieves a user by ID' })
  async getOne(@Param('id') id: string): Promise<any> {
    return await this.userUseCases.getUserById(id);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count the total number of users' })
  @ApiResponse({ status: 200, description: 'Counts the total number of users' })
  async count(): Promise<number> {
    return await this.userUseCases.count();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example1: {
        value: {
          username: 'Essawy',
        },
        summary: 'Example of creating a user',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Creates a new user' })
  async create(@Body() data: CreateUserDto): Promise<any> {
    return await this.userUseCases.createUser(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Deletes a user by ID' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.userUseCases.deleteUser(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all users' })
  @ApiResponse({ status: 200, description: 'Deletes all users' })
  async deleteAll(): Promise<any> {
    return await this.userUseCases.deleteAllUsers();
  }
}
