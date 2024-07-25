import { IsString, IsNotEmpty, IsEmail, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { PlaceDto } from '../../places/dto/place.dto';

export class BusinessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  place: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
