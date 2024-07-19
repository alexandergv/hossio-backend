import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true, unique: true })  // Ensure the ID is unique
  id: string;
  
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
