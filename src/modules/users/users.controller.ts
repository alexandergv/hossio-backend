import { Controller, Post,Get, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { Users } from './schema/users.schema';

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
}
