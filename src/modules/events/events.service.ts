import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schema/events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>
  ) {}

  async getLastEvents(limit: number = 5): Promise<Event[]> {
    return this.eventModel.find().sort({ date: -1 }).limit(limit).exec();
  }

  async createEvent(eventDto: Partial<Event>): Promise<Event> {
    const createdEvent = new this.eventModel(eventDto);
    return createdEvent.save();
  }

  async createMultipleEvents(eventDtos: Event[]): Promise<Event[]> {
    return this.eventModel.insertMany(eventDtos);
  }
}
