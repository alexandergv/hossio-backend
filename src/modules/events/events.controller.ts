import { Controller, Get, Query, Post, Body, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './schema/events.schema';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('latest')
  async getLastEvents(@Query('limit') limit: number): Promise<Event[]> {
    const eventLimit = limit || 5;
    console.log('hola');
    return this.eventsService.getLastEvents(eventLimit);
  }

  @Post('create')
  async createEvent(
    @Body() eventDto: Partial<Event>,
    @Request() req,
  ): Promise<Event> {
    // Extract token from cookies
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    let userId = null;
    const secret = this.configService.get<string>('JWT_SECRET_KEY');

    if (token) {
      try {
        // Decode token to get user ID
        const decoded: any = jwt.verify(token, secret);
        userId = decoded.sub; // Adjust based on your token payload
      } catch (error) {
        throw new Error('No authentication token.');
        // Handle invalid token case if necessary
      }
    }

    return this.eventsService.createEvent(eventDto, userId);
  }

  @Post('bulk-create')
  async createMultipleEvents(@Body() eventDtos: Event[]): Promise<Event[]> {
    return this.eventsService.createMultipleEvents(eventDtos);
  }
}
