// places/places.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { Place, PlaceSchema } from './schema/place.schema';
import { Users, UserSchema } from '../users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Place.name, schema: PlaceSchema },
      { name: Users.name, schema: UserSchema },
    ]),
  ],
  providers: [PlacesService],
  controllers: [PlacesController],
  exports: [PlacesService],
})
export class PlacesModule {}
