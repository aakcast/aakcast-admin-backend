import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from '../../users/dto/user.dto';

/**
 * Passport strategy: JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   * @param configService Injected instance of ConfigService
   */
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: configService.get<string>('JWT_ISSUER'),
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
