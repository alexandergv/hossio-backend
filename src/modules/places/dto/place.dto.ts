import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  coordinates: number[];
}

class ScheduleDto {
  @IsString()
  open: string;

  @IsString()
  close: string;
}

class PlaceDetailsDto {
  @ValidateNested()
  @Type(() => ScheduleDto)
  schedule: {
    monday: ScheduleDto;
    tuesday: ScheduleDto;
    wednesday: ScheduleDto;
    thursday: ScheduleDto;
    friday: ScheduleDto;
    saturday: ScheduleDto;
    sunday: ScheduleDto;
  };

  @IsArray()
  @IsNotEmpty()
  @Type(() => String)
  type: string[];

  @IsArray()
  @IsNotEmpty()
  @Type(() => String)
  characteristics: string[];
}

export class PlaceDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
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

  @ValidateNested()
  @Type(() => PlaceDetailsDto)
  @IsNotEmpty()
  placeDetails: PlaceDetailsDto;
}
