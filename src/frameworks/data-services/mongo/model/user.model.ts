import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  avatar: string;

  @Prop({ type: [{ type: String, ref: 'Room' }] })
  rooms: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
