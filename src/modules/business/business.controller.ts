import { Controller,Get, Post, Body, Param } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { Business } from './schema/business.schema';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post("AddNewBusinness")
  async create(@Body() createBusinessDto: CreateBusinessDto): Promise<Business> {
    return this.businessService.create(createBusinessDto);
  }
  @Get("getById/:id")
  async findOne(@Param('id') id: string): Promise<Business> {
    return this.businessService.findById(id);
  }
}
