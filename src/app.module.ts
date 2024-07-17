// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesModule } from './modules/places/places.module';
import { BusinessModule } from './modules/business/business.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/hossio'), // Cambia la URL según tu configuración
    PlacesModule,
    BusinessModule
  ]
})
export class AppModule {}
