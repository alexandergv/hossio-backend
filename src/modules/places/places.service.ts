// places/places.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place, PlaceDocument } from './schema/place.schema';
import { v4 as uuidv4 } from 'uuid';
import { PlaceDto } from './dto/place.dto';


@Injectable()
export class PlacesService {
  constructor(@InjectModel(Place.name) private placeModel: Model<PlaceDocument>) {}

  async findAll(): Promise<Place[]> {
    return this.placeModel.find().exec();
  }

  async findById(id: string): Promise<Place> {
    const place = await this.placeModel.findById(id).exec();
    if (!place) {
      throw new NotFoundException(`Business with ID ${id} not found`);
    }
    return place;
  }
  
  async createOrUpdate(placeDto: PlaceDto): Promise<Place> {
    let place: any;
    let placeId = placeDto._id;
    
    if (placeId) {
      place = await this.placeModel.findById(placeId).exec();
      if (!place) {
        throw new NotFoundException(`Place with ID ${placeId} not found`);
      }
      Object.assign(place, placeDto);
      place.location = {
        type: 'Point',
        coordinates: placeDto.location.coordinates,
      };
      place.placeDetails = placeDto.placeDetails;
    } else {
      place = new this.placeModel({
        ...placeDto,
        location: {
          type: 'Point',
          coordinates: placeDto.location.coordinates,
        },
        placeDetails: placeDto.placeDetails
      });
    }
    return place.save();
  }

  async findNearby(latitude: number, longitude: number): Promise<Place[]> {
    const places = await this.placeModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
          $maxDistance: 2000, // distance in meters
        },
      },
    }).exec();

    return places.sort((a, b) => {
      const aOpen = this.isPlaceOpen(a.placeDetails.schedule);
      const bOpen = this.isPlaceOpen(b.placeDetails.schedule);

      if (aOpen && !bOpen) return -1;
      if (!aOpen && bOpen) return 1;

      return 0;
    });
  }

  async searchPlaces(query: string): Promise<Place[]> {
    const searchRegex = new RegExp(query, 'i'); // 'i' for case-insensitive
    return this.placeModel.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
      ],
    }).exec();
  }

  async deletePlaceById(id: string): Promise<Place> {
    const place = await this.placeModel.findByIdAndDelete(id).exec();
    if (!place) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }
    return place;
  }

  async bulkInsert(placesDto: PlaceDto[]): Promise<any> {
    try {
      const result = await this.placeModel.insertMany(placesDto, { ordered: false });
      return result;
    } catch (error) {
      console.error('Error inserting places:', error);
      throw error;
    }
  }

  private isPlaceOpen(schedule: {
    [day: string]: { open: string; close: string };
  }): boolean {
    const now = new Date();
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = daysOfWeek[now.getDay()];
    const currentTime = now.toTimeString().slice(0, 5); // 'HH:MM' format
  
    const openTime = schedule[currentDay].open;
    const closeTime = schedule[currentDay].close;
  
    if (openTime === '24/7') {
      return true;
    }
  
    if (openTime === 'Cerrado' || closeTime === 'Cerrado') {
      return false;
    }
  
    if (closeTime < openTime) {
      return currentTime >= openTime || currentTime < closeTime;
    } else {
      return currentTime >= openTime && currentTime < closeTime;
    }
  }
}
