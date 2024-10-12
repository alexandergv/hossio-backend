// src/auth/auth.controller.ts
import { Controller, Post, Request, Response, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from '../modules/users/dto/users.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Users } from 'src/modules/users/schema/users.schema';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Request() req, @Response() res) {
    const { email, password } = req.body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = await this.authService.login(user);
    res.json({ message: 'Logged in successfully', token });
  }

  @Post('logout')
  logout(@Response() res) {
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  @Post('signup')
  async signUp(@Body() createUserDto: UsersDto, @Response() res) {
    const user: Users = await this.usersService.create(createUserDto);
    const token = await this.authService.login(user);
    res.json({ message: 'Logged in successfully', token });
  }
}
