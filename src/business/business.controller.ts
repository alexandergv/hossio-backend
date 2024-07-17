import { Controller, Post, Body } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { Business } from '../schemas/business.schema';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post("AddNewBusinness")
  async create(@Body() createBusinessDto: CreateBusinessDto): Promise<Business> {
    return this.businessService.create(createBusinessDto);
  }

  // Otros endpoints como findAll, findOne, update, delete, etc.
}
