import { Controller,Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDto } from './dto/business.dto';
import { Business } from './schema/business.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post("AddNewBusinness")
  async create(@Body() createBusinessDto: BusinessDto): Promise<Business> {
    return this.businessService.create(createBusinessDto);
  }
  @Get("getById/:id")
  async findOne(@Param('id') id: string): Promise<Business> {
    return this.businessService.findById(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('getByUserId/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.businessService.findByUserId(userId);
  }
}
