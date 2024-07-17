// places/places.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Place } from './interfaces/place.interface';
import { PlaceDto } from './dto/place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('GetAll')
  async findAll(): Promise<Place[]> {
    return this.placesService.findAll();
  }
  @Post('AddNewPlace')
  async create(@Body() placeDto: PlaceDto): Promise<Place> {
    return this.placesService.create(placeDto);
  }
}
