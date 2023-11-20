import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UserUseCases } from '../use-cases/user/user.use-case';
import { UpdatePasswordDto, UpdateUserDto } from 'core/dtos';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) { }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Retrieves all users' })
  async getAll(): Promise<any[]> {
    return await this.userUseCases.getAllUsers();
  }

  @Get('count')
  @ApiOperation({ summary: 'Count the total number of users' })
  @ApiResponse({ status: 200, description: 'Counts the total number of users' })
  async count(): Promise<number> {
    return await this.userUseCases.count();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Retrieves a user by ID' })
  async getOne(@Param('id') id: string): Promise<any> {
    return await this.userUseCases.getUserById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user basic data' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User basic data for the update',
  })
  @ApiResponse({ status: 200, description: 'Updates user by ID' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<any> {
    return await this.userUseCases.updateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Deletes a user by ID' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.userUseCases.deleteUser(id);
  }

  @Patch(':id/password')
  @ApiOperation({ summary: 'Change user password by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    type: UpdatePasswordDto,
    description: 'User password data for the update',
  })
  async updatePassword(
    @Param('id') id: string,
    @Body() UpdatePasswordDto: UpdatePasswordDto,
  ): Promise<any> {
    const { oldPassword, newPassword } = UpdatePasswordDto;
    return await this.userUseCases.changePassword(id, oldPassword, newPassword);
  }
}
