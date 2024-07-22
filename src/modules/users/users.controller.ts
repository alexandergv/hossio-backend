import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('check')
  async checkIfRegistered(@Body('email') email: string) {
    const isRegistered = await this.usersService.checkIfRegistered(email);
    return { isRegistered };
  }
}
