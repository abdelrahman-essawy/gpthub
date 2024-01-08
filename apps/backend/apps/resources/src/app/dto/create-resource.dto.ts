import { Field, InputType } from '@nestjs/graphql';
import {
  IResource,
  IResourceContent,
  ResourceFormat,
  ResourceType,
} from '@core';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IDatabaseEntity } from '../../../../../../../libs/core/src/interfaces/interface';

@InputType({ description: 'Create new resource' })
export class CreateResourceDto
  implements Omit<IResource, keyof (IDatabaseEntity & IResourceContent)>
{
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @Field(() => String)
  @IsOptional()
  @MinLength(3)
  @MaxLength(40)
  description: string;

  @Field(() => String)
  @IsEnum(ResourceFormat)
  format: ResourceFormat;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  @Field(() => String)
  @IsEnum(ResourceType)
  type: ResourceType;
}
