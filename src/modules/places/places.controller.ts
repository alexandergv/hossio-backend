// places/places.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
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
  @Post('AddOrUpdate')
  async create(@Body() placeDto: PlaceDto): Promise<Place> {
    return this.placesService.createOrUpdate(placeDto);
  }
  @Get('getById/:id')
  async findOne(@Param('id') id: string): Promise<Place> {
    return this.placesService.findById(id);
  }

  @Get('nearby')
  async getNearbyPlaces(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('userId') userId?: string,
  ) {
    return this.placesService.findNearby(latitude, longitude, userId);
  }

  @Get('/search')
  async searchPlaces(@Query('q') query: string): Promise<Place[]> {
    return this.placesService.searchPlaces(query);
  }

  @Delete(':id')
  async deletePlace(@Param('id') id: string) {
    return this.placesService.deletePlaceById(id);
  }

  @Post('bulkInsert')
  async bulkInsert(@Body() placesDto: PlaceDto[]): Promise<any> {
    return this.placesService.bulkInsert(placesDto);
  }
}
