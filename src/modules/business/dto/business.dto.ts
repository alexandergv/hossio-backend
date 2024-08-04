import { IsString, IsNotEmpty, IsEmail, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { PlaceDto } from '../../places/dto/place.dto';

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
