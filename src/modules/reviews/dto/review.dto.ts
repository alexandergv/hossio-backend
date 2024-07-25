import { IsString, IsNotEmpty, IsNumber, Min, Max, IsMongoId } from 'class-validator';

export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsMongoId()
  @IsNotEmpty()
  place: string;

  @IsString()
  author: string;
}
