import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserClient } from '../proto/user';

/**
 * Service: Sellers
 */
@Injectable()
export class SellersService implements OnModuleInit {
  /**
   * User service client
   * @private
   */
  private userClient: UserClient;
}
