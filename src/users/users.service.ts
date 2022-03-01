import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, USERS_SERVICE_NAME, AppClient, UsersClient } from 'proto/user';
import { UserDto } from './dto/user.dto';

/**
 * Service: Users
 */
@Injectable()
export class UsersService implements OnModuleInit {
  /**
   * App service client
   * @private
   */
  private appClient: AppClient;
  /**
   * Users service client
   * @private
   */
  private usersClient: UsersClient;

  /**
   * Constructor
   *
   * @param userPackage Injected instance of gRPC client for user microservice
   */
  constructor(@Inject('USER_PACKAGE') private readonly userPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.appClient = this.userPackage.getService<AppClient>(APP_SERVICE_NAME);
    this.usersClient = this.userPackage.getService<UsersClient>(USERS_SERVICE_NAME);
  }

  /**
   * Hello
   */
  hello() {
    const svc$ = this.appClient.hello({});
    return lastValueFrom(svc$);
  }

  /**
   * Validate user with email/password
   *
   * @param type      Type of user
   * @param email     Email
   * @param password  Password
   */
  async validate(type: string, email: string, password: string): Promise<UserDto | null> {
    try {
      const res$ = this.usersClient.validate({ type, email, password });
      const res = await lastValueFrom(res$);
      return new UserDto(res);
    } catch (e) {
      return null;
    }
  }

  /**
   * Find a user by email
   *
   * @param type  Type of user
   * @param email Email
   */
  async findOneByEmail(type: string, email: string): Promise<UserDto | null> {
    try {
      const res$ = this.usersClient.getByEmail({ type, email });
      const res = await lastValueFrom(res$);
      return new UserDto(res);
    } catch (e) {
      return null;
    }
  }

  /**
   * Reset password of a user
   *
   * @param type      Type of user
   * @param email     Email
   * @param password  New password
   */
  async resetPassword(type: string, email: string, password: string): Promise<void> {
    const empty$ = this.usersClient.resetPassword({ type, email, password });
    await lastValueFrom(empty$);
  }
}
