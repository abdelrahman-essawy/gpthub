import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResourcesService } from 'apps/resources/src/resources.service';
import { CreateResourceDto, UpdateResourceDto } from 'core/dtos';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a resource' })
  @ApiBody({
    type: CreateResourceDto,
    description: 'Data to create a resource',
  })
  @ApiResponse({ status: 201, description: 'Resource created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() data: CreateResourceDto): Promise<any> {
    try {
      // const createdResource = await this.resourceService.createResource(data);
      return {
        status: HttpStatus.CREATED,
        data: 'createdResource',
        message: 'Resource created successfully',
      };
    } catch (error) {
      console.error('Error creating resource:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resource by ID' })
  @ApiResponse({ status: 200, description: 'Resource retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getById(@Param('id') id: string): Promise<any> {
    try {
      // const resource = await this.resourceService.getResourceById(id);
      return {
        status: HttpStatus.OK,
        data: 'resource',
        message: 'Resource retrieved successfully',
      };
    } catch (error) {
      console.error('Error retrieving resource:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a resource by ID' })
  @ApiBody({
    type: UpdateResourceDto,
    description: 'Data to update a resource',
  })
  @ApiResponse({ status: 200, description: 'Resource updated successfully' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateResourceDto,
  ): Promise<any> {
    try {
      // const updatedResource = await this.resourceService.updateResource(id, data);
      return {
        status: HttpStatus.OK,
        data: 'updatedResource',
        message: 'Resource updated successfully',
      };
    } catch (error) {
      console.error('Error updating resource:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a resource by ID' })
  @ApiResponse({ status: 204, description: 'Resource deleted successfully' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      // await this.resourceService.deleteResource(id);
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
