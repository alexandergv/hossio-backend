import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Business } from './schema/business.schema';
import { CreateBusinessDto } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(@InjectModel(Business.name) private businessModel: Model<Business>) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const id = uuidv4();
    const createdBusiness = new this.businessModel({ ...createBusinessDto, id });
    return createdBusiness.save();
  }

  async findById(id: string): Promise<Business> {
    const business = await this.businessModel.findOne({id}).exec();
    if (!business) {
      throw new NotFoundException(`Business with ID ${id} not found`);
    }
    return business;
  }

  // Otros métodos como findAll, findOne, update, delete, etc.
}
