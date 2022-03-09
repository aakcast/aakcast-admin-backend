import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SMS_SERVICE_NAME, SmsClient } from 'proto/notification';

/**
 * Service: SMS
 */
@Injectable()
export class SmsService implements OnModuleInit {
  /**
   * SMS service client
   * @private
   */
  private smsClient: SmsClient;

  /**
   * Constructor
   * @param notificationPackage Injected instance of gRPC client for notification microservice
   */
  constructor(@Inject('NOTIFICATION_PACKAGE') private readonly notificationPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.smsClient = this.notificationPackage.getService<SmsClient>(SMS_SERVICE_NAME);
  }

  /**
   * Send SMS to given phone number
   * @param body  message to send
   * @param to    receiver #
   * @param from  (optional) sender #
   */
  async send(body: string, to: string, from?: string): Promise<void> {
    const empty$ = this.smsClient.send({ body, from, to });
    await lastValueFrom(empty$);
  }
}
