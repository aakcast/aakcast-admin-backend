import { Injectable } from '@nestjs/common';

/**
 * Service: App
 */
@Injectable()
export class AppService {
  /**
   * Say hello
   */
  getHello(): string {
    return 'Hello World!';
  }
}
