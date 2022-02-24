import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AAKCAST_USER_PACKAGE_NAME } from '../proto/user';
import { StaffsController } from './staffs.controller';
import { StaffsService } from './staffs.service';

/**
 * Module: Staffs
 */
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:7001',
          package: AAKCAST_USER_PACKAGE_NAME,
          protoPath: [join(__dirname, '../proto/user.proto')],
        },
      },
    ]),
  ],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
