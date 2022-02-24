import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth/auth.service';
import { UserType } from '../../auth/enums/user-type.enum';
import { User } from '../../auth/types/user';

/**
 * Passport strategy: Local
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   *
   * @param authService Injected instance of auth service
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
  async validate(username: string, password: string): Promise<User> {
    // TODO: 좀 이상하구나. 'local-staff', 'local-admin' 이렇게 써야 할 듯.
    const user =
      (await this.authService.validateUser(UserType.Staff, username, password)) ||
      (await this.authService.validateUser(UserType.Seller, username, password));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
