import { IsString, IsNotEmpty, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlaceDto } from '../../places/dto/place.dto';

export class CreateBusinessDto {
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

  @ValidateNested()
  @Type(() => PlaceDto)
  place: PlaceDto;
}
