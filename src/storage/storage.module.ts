import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AAKCAST_COMMON_PACKAGE_NAME } from 'proto/common';
import { AAKCAST_STORAGE_PACKAGE_NAME } from 'proto/storage';
import { ObjectsService } from './objects/objects.service';
import { StorageService } from './storage.service';

/**
 * DynamicModule: gRPC clients
 * - aakcast.storage package
 */
export const StoragePackage = ClientsModule.register([
  {
    name: 'STORAGE_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:7004',
      package: [AAKCAST_COMMON_PACKAGE_NAME, AAKCAST_STORAGE_PACKAGE_NAME],
      protoPath: 'proto/storage.proto',
    },
  },
]);

/**
 * Module: Storage
 */
@Module({
  imports: [StoragePackage],
  providers: [ObjectsService, StorageService],
  exports: [ObjectsService],
})
export class StorageModule {}
