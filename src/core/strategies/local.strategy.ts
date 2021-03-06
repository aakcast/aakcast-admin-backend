import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import { UserDto } from '../../users/dto/user.dto';

/**
 * Passport strategy: Local
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   * @param usersService Injected instance of auth service
   */
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  /**
   * Validate credentials
   * @param username  login ID of user
   * @param password  login password of user
   */
  async validate(username: string, password: string): Promise<UserDto> {
    const user =
      (await this.usersService.validate('staff', username, password)) ||
      (await this.usersService.validate('seller', username, password));
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
