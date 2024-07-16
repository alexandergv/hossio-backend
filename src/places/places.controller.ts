// places/places.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Place } from '../interfaces/place.interface';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('GetAll')
  async findAll(): Promise<Place[]> {
    return this.placesService.findAll();
  }
}
