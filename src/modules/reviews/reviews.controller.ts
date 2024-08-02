import { Controller, Param, Get, Post, Body, UseGuards, Request, Response } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import * as jwt from 'jsonwebtoken'
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

  @Get('averageRating/:placeId')
  async getAverageRating(@Param('placeId') placeId: string): Promise<{ averageRating: number }> {
    const averageRating = await this.reviewsService.getAverageRating(placeId);
    return { averageRating };
  }

  @Get('byPlaceId/:placeId')
  async getReviewsByPlaceId(@Param('placeId') placeId: string, @Request() req, @Response() res): Promise<any> {
    
     // Extract token from cookies
    const token = req.headers.cookie?.split(';')
      .find(row => row.startsWith('auth_token='))
      .split('=')[1];
     let userId = null;

     if (token) {
       try {
         // Decode token to get user ID
         const decoded: any = jwt.verify(token, 'hossio'); // Replace 'hossio' with your secret
         userId = decoded.sub; // Adjust based on your token payload
       } catch (error) {
         console.warn('Invalid token:', error);
         // Handle invalid token case if necessary
       }
     }
    // Fetch reviews for the place
    const reviews = await this.reviewsService.findAllByPlaceId(placeId);

    // Check if the user has commented
    const userReview = reviews.find(review => review.user === userId);
    return res.json({
      reviews,
      userHasCommented: !!userReview
    });
  }
}
