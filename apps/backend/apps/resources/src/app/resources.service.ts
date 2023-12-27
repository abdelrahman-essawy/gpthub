import { Inject, Injectable } from '@nestjs/common';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @Inject('RESOURCES_DATABASE_SERVICE')
    private readonly databaseService: Repository<Resource>
  ) {}

  create(createResourceInput: CreateResourceInput) {
    return this.databaseService.manager.save(new Resource(createResourceInput));
  }

  findAll() {
    return this.databaseService.find();
  }

  findOne(id: string) {
    return this.databaseService.findOneBy({ id });
  }

  update(id: number, updateResourceInput: UpdateResourceInput) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }

  findForAuthor(authorId: string) {
    return this.databaseService.find({
      where: { authorId },
    });
  }
}
