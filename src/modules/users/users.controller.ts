import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: UsersDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('check')
  async checkIfRegistered(@Body('email') email: string) {
    const isRegistered = await this.usersService.checkIfRegistered(email);
    return { isRegistered };
  }
}
