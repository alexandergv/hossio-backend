import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  placeName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Place' })
  placeId: Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  date: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);