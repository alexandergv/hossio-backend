import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schema/review.schema';
import { ReviewDto } from './dto/review.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>,
  private usersService: UsersService
) {}

  async create(reviewDto: ReviewDto): Promise<Review> {
    const { user, place } = reviewDto;
    
    const existingReview = await this.reviewModel.findOne({ user, place });
    if (existingReview) {
      throw new ConflictException('User has already reviewed this place');
    }

    const author = (await this.usersService.findById(user)).username;
    if (!author) {
      throw new NotFoundException('Author user was not found.');
    }
    reviewDto.author = author;

    const createdReview = new this.reviewModel(reviewDto);
    return createdReview.save();
  }

  async findAllByPlaceId(placeId: string): Promise<Review[]> {
    return this.reviewModel.find({ place: placeId }).exec();
  }

  async getAverageRating(placeId: string): Promise<number> {
    const reviews = await this.findAllByPlaceId(placeId);
    if (reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }
}
