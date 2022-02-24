import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../auth/types/user';

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
  async validate(payload: any): Promise<User> {
    const { sub: id, ...data } = payload;
    return { id, ...data };
  }
}
