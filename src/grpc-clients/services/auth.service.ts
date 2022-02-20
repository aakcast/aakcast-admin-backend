import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  IAuthService,
  Id,
  ServiceDescriptor,
  Authentication,
  Otp,
} from '../interfaces/auth.interface';

/**
 * Service: Auth
 */
@Injectable()
export class AuthService implements OnModuleInit {
  /**
   * Auth microservice interface
   * @private
   */
  private service: IAuthService;

  /**
   * Constructor
   *
   * @param authClient  Injected instance of GRPC client for auth microservice
   */
  constructor(@Inject('AUTH_MICROSERVICE') private readonly authClient: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.service = this.authClient.getService<IAuthService>('AuthService');
  }

  /**
   * Hello
   */
  async hello(): Promise<ServiceDescriptor> {
    const svc$ = this.service.hello({});
    return await lastValueFrom(svc$);
  }

  async getOrCreateAccount(username: string, password: string): Promise<Authentication> {
    try {
      const auth$ = this.service.validateAccount({ username, password });
      return await lastValueFrom(auth$);
    } catch (e) {
      if (typeof e.details === 'string' && e.details.startsWith('404')) {
        // Create new account
        const id$ = this.service.createAccount({ username, password });
        const { id } = await lastValueFrom(id$);
        return {
          id,
          roles: [],
          isAdmin: false,
          staffId: null,
          sellerId: null,
        };
      } else {
        // Error
        throw e;
      }
    }
  }

  async updateAccount(id: string, data: any): Promise<void> {
    const void$ = this.service.updateAccount({
      id,
      password: data.password,
      staffId: data.staffId,
      sellerId: data.sellerId,
    });
    await lastValueFrom(void$);
  }

  /**
   * Validate account for login
   *
   * @param username  login ID of user
   * @param password  login password of user
   */
  async validateAccount(username: string, password: string): Promise<Authentication | null> {
    const auth$ = this.service.validateAccount({ username, password });
    return await lastValueFrom(auth$);
  }

  /**
   * Issue OTP for temporary login
   * @param mobile  mobile number of user
   * @param digits  length of OTP
   */
  async createTemporaryCredentials(mobile: string, digits = 6): Promise<Otp> {
    const otp$ = this.service.createTemporaryCredentials({
      mobile,
      digits,
      expires: new Date(Date.now() + 3 * 60 * 1000), // 3 minutes
    });
    return await lastValueFrom(otp$);
  }

  /**
   * Validate OTP for temporary login
   *
   * @param mobile  mobile number of user
   * @param code    OTP
   */
  async validateTemporaryCredentials(mobile: string, code: string): Promise<Authentication> {
    const auth$ = this.service.validateTemporaryCredentials({ mobile, code });
    return await lastValueFrom(auth$);
  }
}
