import { IsString, IsNotEmpty, IsEmail, IsMongoId } from 'class-validator';

export class BusinessDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  description: string;

  @IsMongoId()
  place: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
