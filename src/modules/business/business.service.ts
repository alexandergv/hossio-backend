import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Business } from './schema/business.schema';
import { BusinessDto } from './dto/business.dto';

@Injectable()
export class BusinessService {
  constructor(@InjectModel(Business.name) private businessModel: Model<Business>) {}

  async createOrUpdate(businessDto: BusinessDto): Promise<Business> {
    let business: Business;
    let businessId = businessDto._id;
    
    if (businessId) {
      business = await this.businessModel.findById(businessId).exec();
      if (!business) {
        throw new NotFoundException(`Business with ID ${businessId} not found`);
      }
      Object.assign(business, businessDto);
    } else {
      business = new this.businessModel({ ...businessDto, id: uuidv4() });
    }
    return business.save();
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

  async deleteBusinessById(id: string): Promise<Business> {
    const business = await this.businessModel.findByIdAndDelete(id).exec();
    if (!business) {
      throw new NotFoundException(`Business with ID ${id} not found`);
    }
    return business;
  }
}
