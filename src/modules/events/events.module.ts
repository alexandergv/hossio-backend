import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventSchema } from './schema/events.schema';
import { BusinessModule } from '../business/business.module';
import { PlacesModule } from '../places/places.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    BusinessModule,
    PlacesModule
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
