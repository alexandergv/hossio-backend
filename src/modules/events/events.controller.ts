import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './schema/events.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('latest')
  async getLastEvents(@Query('limit') limit: number): Promise<Event[]> {
    const eventLimit = limit || 5;
    return this.eventsService.getLastEvents(eventLimit);
  }

  @Post('create')
  async createEvent(@Body() eventDto: Partial<Event>): Promise<Event> {
    return this.eventsService.createEvent(eventDto);
  }

  @Post('bulk-create')
  async createMultipleEvents(@Body() eventDtos: Event[]): Promise<Event[]> {
    return this.eventsService.createMultipleEvents(eventDtos);
  }
}
