import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Place' })
  place: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Place' })
  
  @Prop({ required: true })
  author: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
