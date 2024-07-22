// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/modules/users/schema/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Users) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    // const token = this.jwtService.sign( {
    //   hello: 'world'   
    // }, 'myverysecretkey', {
    //     expiresIn: '24h'
    // });
    return {
      access_token
    };
  }
}


