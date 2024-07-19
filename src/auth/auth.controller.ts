// src/auth/auth.controller.ts
import { Controller, Post, Request, UseGuards, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req, @Response() res) {
    const { email, password } = req.body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    const token = await this.authService.login(user);
    res.cookie('auth_token', token.access_token, { httpOnly: true });
    res.json({ message: 'Logged in successfully', token });
  }
}
