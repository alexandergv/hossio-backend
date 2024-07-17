// places/places.service.ts
import { Injectable } from '@nestjs/common';
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
  
  async create(placeDto: PlaceDto): Promise<Place> {
    const id = uuidv4();
    const createdPlace = new this.placeModel({ ...placeDto, id });
    return createdPlace.save();
  }
}
