import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  placeName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Place' })
  placeId: Types.ObjectId;

  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
  
  @Prop({ required: true, enum: ['descuento', 'promocion'] })
  type: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);