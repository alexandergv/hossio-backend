import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Place } from 'src/modules/places/schema/place.schema';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'user' })
  role: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Place' }] })
  favoritePlaces: Types.ObjectId[];  // Array of places as favorites
}

export const UserSchema = SchemaFactory.createForClass(Users);
