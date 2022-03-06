import { UNAUTHORIZED_EXCEPTION } from './../../common/config/constants';
import { ACCESS_TOKEN_NAME } from '@config/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '@auth/interface/jwt-payload.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies[ACCESS_TOKEN_NAME];
        },
      ]),
      secretOrKey: process.env.PRIVATE_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) throw new UnauthorizedException(UNAUTHORIZED_EXCEPTION);

    return user;
  }
}
