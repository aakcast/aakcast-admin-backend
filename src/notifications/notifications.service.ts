import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, AppClient } from 'proto/common';

/**
 * Service: Notifications
 */
@Injectable()
export class NotificationsService implements OnModuleInit {
  /**
   * App service client
   * @private
   */
  private appClient: AppClient;

  /**
   * Constructor
   * @param userPackage Injected instance of gRPC client for user microservice
   */
  constructor(@Inject('NOTIFICATION_PACKAGE') private readonly userPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.appClient = this.userPackage.getService<AppClient>(APP_SERVICE_NAME);
  }

  /**
   * Hello
   */
  hello() {
    const svc$ = this.appClient.hello({});
    return lastValueFrom(svc$);
  }
}
