import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AAKCAST_COMMON_PACKAGE_NAME } from 'proto/common';
import { AAKCAST_NOTIFICATION_PACKAGE_NAME } from 'proto/notification';
import { NotificationsService } from './notifications.service';
import { SmsService } from './sms/sms.service';

/**
 * DynamicModule: gRPC clients
 * - aakcast.notification package
 */
export const NotificationPackage = ClientsModule.register([
  {
    name: 'NOTIFICATION_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:7003',
      package: [AAKCAST_COMMON_PACKAGE_NAME, AAKCAST_NOTIFICATION_PACKAGE_NAME],
      protoPath: 'proto/notification.proto',
    },
  },
]);

/**
 * Module: Notifications
 */
@Module({
  imports: [NotificationPackage],
  providers: [NotificationsService, SmsService],
  exports: [SmsService],
})
export class NotificationsModule {}
