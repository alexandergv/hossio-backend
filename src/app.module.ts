// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesModule } from './modules/places/places.module';
import { BusinessModule } from './modules/business/business.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { EventsModule } from './modules/events/events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './config/validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema, // Makes the ConfigModule available globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    PlacesModule,
    BusinessModule,
    UsersModule,
    AuthModule,
    ReviewsModule,
    EventsModule,
  ],
})
export class AppModule {}
