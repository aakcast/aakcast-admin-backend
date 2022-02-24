import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, AUTH_SERVICE_NAME, AppClient, AuthClient } from '../proto/auth';
import { User, UserType } from './types/user';
import { Otp } from './types/otp';

@Injectable()
export class AuthService implements OnModuleInit {
  /**
   * App service client
   * @private
   */
  private appClient: AppClient;
  /**
   * Auth service client
   * @private
   */
  private authClient: AuthClient;

  /**
   * Constructor
   *
   * @param authPackage Injected instance of gRPC client for auth microservice
   */
  constructor(@Inject('AUTH_PACKAGE') private readonly authPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.appClient = this.authPackage.getService<AppClient>(APP_SERVICE_NAME);
    this.authClient = this.authPackage.getService<AuthClient>(AUTH_SERVICE_NAME);
  }

  /**
   * Hello
   */
  async hello() {
    const svc$ = this.appClient.hello({});
    return await lastValueFrom(svc$);
  }

  /**
   * Find user by email
   *
   * @param type      user type
   * @param email     login email of user
   */
  async findUser(type: UserType, email: string): Promise<User> {
    const user$ = this.authClient.findUser({ type, email });
    return await lastValueFrom(user$);
  }

  /**
   * Validate user for login
   *
   * @param type      user type
   * @param email     login email of user
   * @param password  login password of user
   */
  async validateUser(type: UserType, email: string, password: string): Promise<User | null> {
    try {
      const user$ = this.authClient.validateUser({ type, email, password });
      return await lastValueFrom(user$);
    } catch (e) {
      return null;
    }
  }

  /**
   * Issue OTP for temporary login
   * @param mobile  mobile number of user
   * @param digits  length of OTP
   */
  async createTemporaryCredentials(mobile: string, digits = 6): Promise<Otp> {
    const otp$ = this.authClient.createTemporaryCredentials({
      mobile,
      digits,
      expires: new Date(Date.now() + 3 * 60 * 1000).toString(), // 3 minutes
    });
    return await lastValueFrom(otp$);
  }

  /**
   * Validate OTP for temporary login
   *
   * @param mobile  mobile number of user
   * @param code    OTP
   * @param email   email (give higher authorization level)
   */
  async validateTemporaryCredentials(mobile: string, code: string, email?: string): Promise<User> {
    const user$ = this.authClient.validateTemporaryCredentials({ mobile, code, email });
    return await lastValueFrom(user$);
  }

  /**
   * Reset password
   *
   * @param type      user type
   * @param email     email (give higher authorization level)
   * @param password  new password
   */
  async resetPassword(type: UserType, email: string, password: string): Promise<void> {
    const empty$ = this.authClient.resetPassword({ type, email, password });
    await lastValueFrom(empty$);
  }
}
