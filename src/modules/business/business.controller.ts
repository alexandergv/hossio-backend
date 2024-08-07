import { Controller,Get, Delete, Post, Body, Param, UseGuards} from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDto } from './dto/business.dto';
import { Business } from './schema/business.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post("AddOrUpdate")
  async create(@Body() createBusinessDto: BusinessDto): Promise<Business> {
    return this.businessService.createOrUpdate(createBusinessDto);
  }
  @Get("getById/:id")
  async findOne(@Param('id') id: string): Promise<Business> {
    return this.businessService.findById(id);
  }
  
  // @UseGuards(JwtAuthGuard)
  @Get('getByUserId/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.businessService.findByUserId(userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBusiness(@Param('id') id: string) {
    return this.businessService.deleteBusinessById(id);
  }
}
