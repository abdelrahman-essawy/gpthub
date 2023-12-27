import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IResource, ResourceFormat, ResourceType } from '@core';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IDatabaseEntity } from '../../../../../../../libs/core/src/interfaces/interface';

@InputType()
@ArgsType()
export class CreateResourceInput
  implements Omit<IResource, keyof IDatabaseEntity>
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
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  @Field(() => String)
  @IsEnum(ResourceType)
  type: ResourceType;
}
