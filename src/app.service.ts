import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';

/**
 * Service: App
 */
@Injectable()
export class AppService {
  /**
   * Service descriptor
   * @private
   */
  private readonly serviceDescriptor: Record<string, string>;

  /**
   * Constructor
   * @param configService Injected instance of ConfigService
   */
  constructor(private readonly configService: ConfigService) {
    const file = fs.readFileSync('package.json', { encoding: 'utf8' });
    const data = JSON.parse(file);
    this.serviceDescriptor = {
      name: data.name ?? 'aakcast-admin-backend',
      stage: configService.get<string>('NODE_ENV', 'development'),
      version: data.version ?? 'unknown',
    };
  }

  /**
   * Say hello
   */
  getHello() {
    return this.serviceDescriptor;
  }
}
