import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Users } from 'src/modules/users/schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService,
    @InjectModel(Users.name) private userModel: Model<Users>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // Extract token from cookies
          const token = req.headers.cookie?.split(';')
          .find(row => row.startsWith('auth_token='))
          ?.split('=')[1];
          return token;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    // Aquí puedes realizar validaciones adicionales
    const user = await this.userModel.findById(payload.sub).exec();
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { userId: user._id, email: user.email, role: user.role };
  }
}
