import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ICreateResource, ResourceFormat, ResourceType } from '@core';

@InputType({ description: 'Create new resource' })
export class CreateResourceInput {
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

export class CreateResource
  extends CreateResourceInput
  implements ICreateResource
{
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}
