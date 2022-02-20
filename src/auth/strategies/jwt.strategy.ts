import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Authentication } from '../../grpc-clients/interfaces/auth.interface';

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
  async validate(payload: any): Promise<Authentication> {
    return {
      id: payload.sub,
      roles: payload.roles,
      isAdmin: payload.isAdmin,
      staffId: payload.staffId ?? null,
      sellerId: payload.sellerId ?? null,
    };
  }
}
