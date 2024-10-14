import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';
import { Place } from '../../places/schema/place.schema';

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Place' })
  place: Types.ObjectId;

  @Prop({ required: true })
  author: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.post('save', async function (doc, next) {
  setImmediate(async () => {
    const placeModel = this.model('Place') as Model<Place>;
    const placeId = doc.place;

    const reviews: any = await this.model('Review')
      .find({ place: placeId })
      .exec();
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await placeModel.findByIdAndUpdate(placeId, {
      rating: averageRating,
      // reviewCount: reviews.length,
    });
  });

  next();
});
