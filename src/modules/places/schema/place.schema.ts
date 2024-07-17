// schemas/place.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema()
export class Place extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  reviews: { text: string, author: string }[];

  @Prop({ required: true })
  latitude: string;

  @Prop({ required: true })
  longitude: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
