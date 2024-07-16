// schemas/place.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema()
export class Place {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop([String])
  images: string[];

  @Prop([Object])
  reviews: { text: string; author: string }[];

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
