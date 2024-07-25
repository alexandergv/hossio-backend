import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Business } from './schema/business.schema';
import { BusinessDto } from './dto/business.dto';

@Injectable()
export class BusinessService {
  constructor(@InjectModel(Business.name) private businessModel: Model<Business>) {}

  async create(businessDto: BusinessDto): Promise<Business> {
    const id = uuidv4();
    const createdBusiness = new this.businessModel({ ...businessDto, id });
    return createdBusiness.save();
  }

  async findById(id: string): Promise<Business> {
    const business = await this.businessModel.findOne({id}).exec();
    if (!business) {
      throw new NotFoundException(`Business with ID ${id} not found`);
    }
    return business;
  }

  async findByUserId(userId: string): Promise<Business> {
    const business = await this.businessModel.findOne({ userId }).exec();
    return business;
  }
}
