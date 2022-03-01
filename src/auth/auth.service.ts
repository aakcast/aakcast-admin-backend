import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  APP_SERVICE_NAME,
  TEMP_CREDENTIALS_SERVICE_NAME,
  AppClient,
  TempCredentialsClient,
} from 'proto/auth';
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
   * TempCredentials service client
   * @private
   */
  private tempCredentialsClient: TempCredentialsClient;

  /**
   * Constructor
   * @param authPackage Injected instance of gRPC client for auth microservice
   */
  constructor(@Inject('AUTH_PACKAGE') private readonly authPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.appClient = this.authPackage.getService<AppClient>(APP_SERVICE_NAME);
    this.tempCredentialsClient = this.authPackage.getService<TempCredentialsClient>(
      TEMP_CREDENTIALS_SERVICE_NAME,
    );
  }

  /**
   * Hello
   */
  hello() {
    const svc$ = this.appClient.hello({});
    return lastValueFrom(svc$);
  }

  /**
   * Issue OTP for temporary login
   * @param mobile  mobile number of user
   * @param digits  length of OTP
   */
  async issueTemporaryCredentials(mobile: string, digits = 6): Promise<OtpDto> {
    const res$ = this.tempCredentialsClient.issue({
      mobile,
      digits,
      expires: new Date(Date.now() + 3 * 60 * 1000).toString(), // 3 minutes
    });
    const res = await lastValueFrom(res$);
    return new OtpDto(res);
  }

  /**
   * Validate OTP for temporary login
   * @param mobile  mobile number of user
   * @param code    OTP
   * @param email   email (give higher authorization level)
   */
  async validateTemporaryCredentials(
    mobile: string,
    code: string,
    email?: string,
  ): Promise<UserDto> {
    const res$ = this.tempCredentialsClient.validate({
      mobile,
      code,
      email,
    });
    const res = await lastValueFrom(res$);
    return new UserDto(res);
  }
}
