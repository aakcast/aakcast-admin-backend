import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { lastValueFrom } from 'rxjs';
import { Strategy } from 'passport-local';
import { AuthService } from '../../grpc-clients/services/auth.service';
import { Authentication } from '../../grpc-clients/interfaces/auth.interface';

/**
 * Passport strategy: Local
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   *
   * @param authService Injected instance of auth microservice
   */
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * Validate credentials
   *
   * @param username  login ID of user
   * @param password  login password of user
   */
  async validate(username: string, password: string): Promise<Authentication | null> {
    const user = await this.authService.validateAccount(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
