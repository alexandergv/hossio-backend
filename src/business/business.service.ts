import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business } from '../schemas/business.schema';
import { CreateBusinessDto } from '../dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(@InjectModel(Business.name) private businessModel: Model<Business>) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const createdBusiness = new this.businessModel(createBusinessDto);
    return createdBusiness.save();
  }

  // Otros métodos como findAll, findOne, update, delete, etc.
}
