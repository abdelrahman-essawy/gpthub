// src/scalars/json.scalar.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { UserModel } from '../models/user.model';

@ObjectType()
export class ResponseEntity {
  @Field(() => String)
  protected message: string;

  @Field(() => Number)
  protected statusCode: number;

  @Field(() => [UserModel], { nullable: true })
  protected data: any;

  @Field(() => String)
  protected serverName: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  protected metadata: JSON;

  constructor({
    message,
    statusCode,
    data,
    metadata,
  }: {
    message: string;
    statusCode: number;
    data: any;
    metadata?: any;
  }) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.serverName = 'users';
    this.metadata = metadata;
  }

  static ok({
    message,
    data,
    metadata,
  }: {
    message: string;
    data: any;
    metadata?: any;
  }) {
    return new ResponseEntity({
      message,
      data,
      statusCode: 200,
      metadata,
    });
  }
}
