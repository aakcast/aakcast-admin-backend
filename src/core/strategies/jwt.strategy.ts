import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from '../../auth/dto/user.dto';

/**
 * Passport strategy: JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   */
  constructor() {
    super({
      secretOrKey: 'my-secret', // TODO
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: 'aakcast.io',
      ignoreExpiration: false,
    });
  }

  /**
   * Validate JWT payload
   *
   * @param payload JWT payload
   */
  async validate(payload: any): Promise<UserDto> {
    return new UserDto({
      type: payload.type,
      id: payload.sub,
      email: payload.email,
      isAdmin: payload.isAdmin,
      createdAt: payload.joinedAt,
    });
  }
}
