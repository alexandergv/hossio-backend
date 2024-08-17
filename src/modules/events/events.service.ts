import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schema/events.schema';
import { Business } from '../business/schema/business.schema';
import { Place } from '../places/schema/place.schema';
import { BusinessService } from '../business/business.service';
import { PlacesService } from '../places/places.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    private businessService: BusinessService,
    private placeService: PlacesService,
  ) {}

  async getLastEvents(limit: number = 5): Promise<Event[]> {
    const currentDate = new Date();
    try {
      return await this.eventModel
      .find({ 
        startDate: { $lte: currentDate },  // Events that have started
        endDate: { $gte: currentDate }    // Events that haven't ended
      })
      .sort({ startDate: -1 })  // Sort by startDate descending (most recent first)
      .limit(limit)             // Limit the number of results
      .lean()                   // Return plain JavaScript objects instead of Mongoose documents
      .exec();                  // Execute the query
    } catch (error) {
      // Handle any errors that might occur during the query
      console.error('Error fetching last events:', error);
      throw new Error('Could not fetch the last events');
    }
  }

  async createEvent(eventDto: Partial<Event>, userId: any): Promise<Event> {
    const createdEvent = new this.eventModel(eventDto);
    const owner = await this.businessService.findByUserId(userId);
    const place = await this.placeService.findById(owner.place.toString());

    createdEvent.placeId = place.id;
    createdEvent.placeName = place.name;

    console.log(createdEvent);
    return createdEvent.save();
  }

  async createMultipleEvents(eventDtos: Event[]): Promise<Event[]> {
    return this.eventModel.insertMany(eventDtos);
  }
}
