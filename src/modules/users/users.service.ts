import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {UsersDto} from './dto/users.dto';
import { Model } from 'mongoose';
import { Users, UserDocument } from './schema/users.schema';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<Users | undefined> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<Users | undefined> {
    return this.userModel.findById(id).lean().exec();
  }

  async findWithoutPass(id: string): Promise<any | undefined> {
    const foundUser = await this.userModel.findById(id).lean().exec();
    const { password, ...result } = foundUser;
    return result;
  }

  async create(userDto: UsersDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const createdUser = new this.userModel({ ...userDto, password: hashedPassword });
    return createdUser.save();
  }

  async checkIfRegistered(email: string): Promise<boolean> {
    const user = await this.findOne(email);
    return !!user;
  }
}
