import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Place } from './place.schema';

@Schema()
export class Business extends Document {
  @Prop({ required: true, unique: true })  // Ensure the ID is unique
  id: string;
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Place, required: true })
  place: Place;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
