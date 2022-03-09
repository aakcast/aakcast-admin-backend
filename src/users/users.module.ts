import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AAKCAST_COMMON_PACKAGE_NAME } from '../../proto/common';
import { AAKCAST_USER_PACKAGE_NAME } from 'proto/user';
import { StoragePackage } from '../storage/storage.module';
import { UsersService } from './users.service';
import { ObjectsService } from '../storage/objects/objects.service';
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
      package: [AAKCAST_COMMON_PACKAGE_NAME, AAKCAST_USER_PACKAGE_NAME],
      protoPath: 'proto/user.proto',
    },
  },
]);

/**
 * Module: Users
 */
@Module({
  imports: [UserPackage, StoragePackage],
  controllers: [StaffsController, SellersController],
  providers: [UsersService, StaffsService, SellersService, ObjectsService],
  exports: [UsersService],
})
export class UsersModule {}
