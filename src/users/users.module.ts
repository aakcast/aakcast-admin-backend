import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AAKCAST_USER_PACKAGE_NAME } from 'proto/user';
import { UsersService } from './users.service';
import { StaffsController } from './staffs/staffs.controller';
import { StaffsService } from './staffs/staffs.service';
import { SellersService } from './sellers/sellers.service';
import { SellersController } from './sellers/sellers.controller';

/**
 * DynamicModule: gRPC clients
 * - aakcast.user package
 */
export const UserPackage = ClientsModule.register([
  {
    name: 'USER_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:7001',
      package: AAKCAST_USER_PACKAGE_NAME,
      protoPath: ['proto/user.proto'],
    },
  },
]);

/**
 * Module: Users
 */
@Module({
  imports: [UserPackage],
  controllers: [StaffsController, SellersController],
  providers: [UsersService, StaffsService, SellersService],
  exports: [UsersService],
})
export class UsersModule {}
