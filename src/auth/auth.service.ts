import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, AUTH_SERVICE_NAME, AppClient, AuthClient } from 'proto/auth';
import { UserDto } from './dto/user.dto';
import { OtpDto } from './dto/otp.dto';

/**
 * Service: Auth
 */
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
  hello() {
    const svc$ = this.appClient.hello({});
    return lastValueFrom(svc$);
  }

  /**
   * Find user by email
   *
   * @param type  user type
   * @param email login email of user
   */
  async findUser(type: string, email: string): Promise<UserDto> {
    const res$ = this.authClient.findUser({
      type,
      email,
    });
    const res = await lastValueFrom(res$);
    return new UserDto(res);
  }

  /**
   * Validate user for login
   *
   * @param type      user type
   * @param email     login email of user
   * @param password  login password of user
   */
  async validateUser(type: string, email: string, password: string): Promise<UserDto | null> {
    try {
      const res$ = this.authClient.validateUser({
        type,
        email,
        password,
      });
      const res = await lastValueFrom(res$);
      return new UserDto(res);
    } catch (e) {
      return null;
    }
  }

  /**
   * Issue OTP for temporary login
   *
   * @param mobile  mobile number of user
   * @param digits  length of OTP
   */
  async createTemporaryCredentials(mobile: string, digits = 6): Promise<OtpDto> {
    const res$ = this.authClient.createTemporaryCredentials({
      mobile,
      digits,
      expires: new Date(Date.now() + 3 * 60 * 1000).toString(), // 3 minutes
    });
    const res = await lastValueFrom(res$);
    return new OtpDto(res);
  }

  /**
   * Validate OTP for temporary login
   *
   * @param mobile  mobile number of user
   * @param code    OTP
   * @param email   email (give higher authorization level)
   */
  async validateTemporaryCredentials(
    mobile: string,
    code: string,
    email?: string,
  ): Promise<UserDto> {
    const res$ = this.authClient.validateTemporaryCredentials({
      mobile,
      code,
      email,
    });
    const res = await lastValueFrom(res$);
    return new UserDto(res);
  }

  /**
   * Reset password
   *
   * @param type      user type
   * @param email     email (give higher authorization level)
   * @param password  new password
   */
  async resetPassword(type: string, email: string, password: string): Promise<void> {
    const empty$ = this.authClient.resetPassword({
      type,
      email,
      password,
    });
    await lastValueFrom(empty$);
  }
}
