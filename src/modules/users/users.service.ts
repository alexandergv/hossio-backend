import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDto } from './dto/users.dto';
import { Model, Types } from 'mongoose';
import { Users, UserDocument } from './schema/users.schema';
import * as bcrypt from 'bcrypt';
import { Place, PlaceDocument } from '../places/schema/place.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {}

  async findOne(email: string): Promise<Users | undefined> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<Users | undefined> {
    return this.userModel.findById(id).lean().exec();
  }

  async findWithoutPass(id: string): Promise<any | undefined> {
    const foundUser = await this.userModel.findById(id).lean().exec();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = foundUser;
    return result;
  }

  async create(userDto: UsersDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const createdUser = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async checkIfRegistered(email: string): Promise<boolean> {
    const user = await this.findOne(email);
    return !!user;
  }

  async addFavoritePlace(userId: string, placeId: string): Promise<Users> {
    const user = await this.userModel.findById(userId);
    const place = await this.placeModel.findById(placeId);

    if (!user || !place) {
      throw new NotFoundException('User or Place not found');
    }

    const placeObjectId = new Types.ObjectId(placeId); // Convert placeId to ObjectId

    // Check if place is already in the favorites by comparing ObjectIds
    if (
      !user.favoritePlaces.some((favorite) => favorite.equals(placeObjectId))
    ) {
      user.favoritePlaces.push(placeObjectId); // Push the ObjectId, not the string
      await user.save();
    }

    return user;
  }

  async removeFavoritePlace(userId: string, placeId: string): Promise<Users> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.favoritePlaces = user.favoritePlaces.filter(
      (id) => id.toString() !== placeId,
    );

    await user.save();
    return user;
  }

  async getFavoritePlaces(userId: string): Promise<Place[]> {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'favoritePlaces', // Ensure this matches the field in your User schema
        model: 'Place', // Ensure it references the Place model
      })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.favoritePlaces as unknown as Place[]; // Cast it to the Place[] type
  }
}
