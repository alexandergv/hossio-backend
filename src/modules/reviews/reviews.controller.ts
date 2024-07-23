import { Controller, Param, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Review } from './schema/review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('newReview')
  async create(@Body() reviewDto: ReviewDto) {
    return this.reviewsService.create(reviewDto);
  }

  @Get('byPlaceId/:placeId')
  async getReviewsByPlaceId(@Param('placeId') placeId: string): Promise<Review[]> {
    return this.reviewsService.findAllByPlaceId(placeId);
  }
}
