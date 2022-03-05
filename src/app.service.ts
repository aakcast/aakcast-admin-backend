import { Injectable } from '@nestjs/common';
import fs from 'fs';

/**
 * Service: App
 */
@Injectable()
export class AppService {
  /**
   * Say hello
   */
  getHello() {
    const file = fs.readFileSync('package.json', { encoding: 'utf8' });
    const { name, version, description } = JSON.parse(file);
    return {
      name,
      version,
      description,
    };
  }
}
