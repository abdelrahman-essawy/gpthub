import {
  Injectable,
  ConflictException,
  BadRequestException,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { DatabaseServices } from 'core/abstracts';
import { CreateResourceDto } from 'core/dtos';
import { ProducerService, TOPICS } from 'libs/shared/kafka';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class ResourcesUseCases {
  constructor(
    private readonly databaseService: DatabaseServices,
    private readonly producerService: ProducerService,
  ) { }

  // async commonConflictValidation(
  // resourceDto: CreateResourceDto | UpdateResourceDto | any,
  // ): Promise<void> {
  // try {
  // const namePromise = resourceDto.name
  //   ? this.databaseService.nosql.resource.isNameExists(resourceDto.name)
  //   : Promise.resolve(false);
  //
  // const typePromise = resourceDto.type
  //   ? this.databaseService.nosql.resource.isTypeExists(resourceDto.type)
  //   : Promise.resolve(false);
  //
  // const [isNameExists, isTypeExists] = await Promise.all([
  //   namePromise,
  //   typePromise,
  // ]);

  //   if (isNameExists && isTypeExists) {
  //     throw new ConflictException({
  //       message: 'Resource with the same name and type already exists',
  //     });
  //   }
  //
  //   if (isNameExists) {
  //     throw new ConflictException({
  //       message: 'Resource with the same name already exists',
  //     });
  //   }
  //
  //   if (isTypeExists) {
  //     throw new ConflictException({
  //       message: 'Resource with the same type already exists',
  //     });
  //   }
  // } catch (error) {
  //   throw new BadRequestException({ message: error.message });
  // }
  // }

  @Post('uploadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      // You can do something with the uploaded file here
      console.log('File uploaded:', file);

      // Return a response
      return {
        status: HttpStatus.CREATED,
        data: 'File uploaded successfully',
        message: 'File uploaded successfully',
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new BadRequestException({ message: error.message });
    }
  }

  async createResource(createResourceDto: CreateResourceDto): Promise<any> {
    // await this.commonConflictValidation(createResourceDto);

    const resource = await this.databaseService.nosql.resource.create({
      ...createResourceDto,
    });

    if (!resource) {
      throw new BadRequestException({ message: 'Resource not created' });
    }

    const test = await this.producerService.produce({
      topic: 'RESOURCE_PROCESS',
      messages: [
        {
          key: 'resource',
          value: JSON.stringify(resource),
        },
      ],
    });

    return {
      message: 'Resource created successfully',
      data: resource,
    };
  }

  async getResourceById(id: string): Promise<any> {
    const resource = this.databaseService.nosql.resource.findOneById(id);

    if (!resource) {
      throw new NotFoundException({ message: 'Resource not found' });
    }

    return resource;
  }

  async deleteResource(id: string): Promise<any> {
    if (!(await this.databaseService.nosql.resource.findOneById(id))) {
      throw new NotFoundException({ message: 'Resource not found' });
    }

    try {
      await this.databaseService.nosql.resource.delete(id);
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }

    return {
      message: 'Resource deleted successfully',
    };
  }

  // Add other resource-related methods as needed
}
