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


  @Prop({
    type: Object,
    default: {
      schedule: {
        monday: { open: '', close: '' },
        tuesday: { open: '', close: '' },
        wednesday: { open: '', close: '' },
        thursday: { open: '', close: '' },
        friday: { open: '', close: '' },
        saturday: { open: '', close: '' },
        sunday: { open: '', close: '' },
      },
      type: [],
      characteristics: []
    },
  })
  placeDetails: {
    schedule: {
      monday: { open: string, close: string },
      tuesday: { open: string, close: string },
      wednesday: { open: string, close: string },
      thursday: { open: string, close: string },
      friday: { open: string, close: string },
      saturday: { open: string, close: string },
      sunday: { open: string, close: string },
    },
    type: string[],
    characteristics: string[],
  };
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
PlaceSchema.index({ location: '2dsphere' });