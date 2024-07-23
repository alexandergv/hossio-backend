import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schema/review.schema';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async create(reviewDto: ReviewDto): Promise<Review> {
    const { user, place } = reviewDto;
    
    const existingReview = await this.reviewModel.findOne({ user, place });
    if (existingReview) {
      throw new ConflictException('User has already reviewed this place');
    }

    const createdReview = new this.reviewModel(reviewDto);
    return createdReview.save();
  }

  async findAllByPlaceId(placeId: string): Promise<Review[]> {
    return this.reviewModel.find({ place: placeId }).exec();
  }
}
