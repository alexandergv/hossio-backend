import {
  Controller,
  UnauthorizedException,
  Param,
  Get,
  Post,
  Body,
  Request,
  Response,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import * as jwt from 'jsonwebtoken';
import { ReviewDto } from './dto/review.dto';
import { ConfigService } from '@nestjs/config';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly configService: ConfigService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post('newReview')
  async create(@Body() reviewDto: ReviewDto, @Request() req) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    return this.reviewsService.create(reviewDto);
  }

  @Get('averageRating/:placeId')
  async getAverageRating(
    @Param('placeId') placeId: string,
  ): Promise<{ averageRating: number }> {
    const averageRating = await this.reviewsService.getAverageRating(placeId);
    return { averageRating };
  }

  @Get('byPlaceId/:placeId')
  async getReviewsByPlaceId(
    @Param('placeId') placeId: string,
    @Request() req,
    @Response() res,
  ): Promise<any> {
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
        console.warn('Invalid token:', error);
        // Handle invalid token case if necessary
      }
    }
    // Fetch reviews for the place
    const reviews = await this.reviewsService.findAllByPlaceId(placeId);

    // Check if the user has commented
    const userReview = reviews.find((review) => review.user === userId);
    return res.json({
      reviews,
      userHasCommented: !!userReview,
    });
  }
}
