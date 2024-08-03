// schemas/place.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema()
export class Place extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true , default: 0 })
  rating: number;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: false })
  isOpen: boolean;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: { type: string, coordinates: [number, number] };
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
PlaceSchema.index({ location: '2dsphere' });