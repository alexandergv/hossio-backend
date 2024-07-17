import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';

class ReviewDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}

export class PlaceDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsArray()
  @ValidateNested({ each: true })
  reviews: ReviewDto[];

  @IsString()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  longitude: string;
}
