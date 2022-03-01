import { Injectable } from '@nestjs/common';

/**
 * Service: App
 */
@Injectable()
export class AppService {
  /**
   * Say hello
   */
  getHello() {
    return {
      service: 'aakcast-admin-backend',
      version: '1.0',
    };
  }
}
