import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResourceDocument = Resource & Document;

@Schema({ timestamps: true })
export class Resource {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true, enum: ['file', 'text', 'link'] })
  type: 'file' | 'text' | 'link';

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  uploaderId: string;

  @Prop({ type: [{ type: String, ref: 'Room' }], default: [] })
  rooms: string[];

  // Additional properties for file resources
  @Prop()
  filename?: string;

  // Additional properties for link resources
  @Prop()
  linkUrl?: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
