import { IsString, IsNotEmpty,   IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ReviewDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}

class LocationDto {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  coordinates: number[];
}


export class PlaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  rating: number;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  location: LocationDto;
}
