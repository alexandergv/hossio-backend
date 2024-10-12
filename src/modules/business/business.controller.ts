import {
  Controller,
  Get,
  Delete,
  Request,
  Post,
  Body,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessDto } from './dto/business.dto';
import { Business } from './schema/business.schema';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post('AddOrUpdate')
  async create(@Body() createBusinessDto: BusinessDto): Promise<Business> {
    return this.businessService.createOrUpdate(createBusinessDto);
  }
  @Get('getById/:id')
  async findOne(@Param('id') id: string): Promise<Business> {
    return this.businessService.findById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('getByUserId/:userId')
  async getByUserId(@Param('userId') userId: string, @Request() req) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    return this.businessService.findByUserId(userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBusiness(@Param('id') id: string, @Request() req) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    return this.businessService.deleteBusinessById(id);
  }
}
