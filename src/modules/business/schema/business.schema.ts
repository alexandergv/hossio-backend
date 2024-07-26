import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Place } from '../../places/schema/place.schema';

@Schema()
export class Business extends Document {
  
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

  @Prop({ required: true, type: Types.ObjectId, ref: 'Place' })
  place: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
