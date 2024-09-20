import { Controller, Post,Get, Param, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { Users } from './schema/users.schema';
import { Place } from '../places/schema/place.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('check')
  async checkIfRegistered(@Body('email') email: string) {
    const isRegistered = await this.usersService.checkIfRegistered(email);
    return { isRegistered };
  }

  @Get("getById/:id")
  async findOne(@Param('id') id: string): Promise<any> {
    return this.usersService.findWithoutPass(id);
  }


  @Post(':userId/favorite-places/:placeId')
  async addFavoritePlace(
    @Param('userId') userId: string,
    @Param('placeId') placeId: string
  ) {
    return this.usersService.addFavoritePlace(userId, placeId);
  }

  @Delete(':userId/favorite-places/:placeId')
  async removeFavoritePlace(
    @Param('userId') userId: string,
    @Param('placeId') placeId: string
  ) {
    return this.usersService.removeFavoritePlace(userId, placeId);
  }

  @Get(':userId/favorite-places')
  async getFavoritePlaces(@Param('userId') userId: string): Promise<Place[]> {
    return this.usersService.getFavoritePlaces(userId);
  }
}
