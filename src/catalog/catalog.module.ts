import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AAKCAST_COMMON_PACKAGE_NAME } from '../../proto/common';
import { AAKCAST_CATALOG_PACKAGE_NAME } from '../../proto/catalog';
import { CatalogService } from './catalog.service';
import { OffersController } from './offers/offers.controller';
import { OffersService } from './offers/offers.service';
import { OptionGroupsService } from './option-groups/option-groups.service';
import { OptionGroupsController } from './option-groups/option-groups.controller';

/**
 * DynamicModule: gRPC clients
 * - aakcast.catalog package
 */
export const CatalogPackage = ClientsModule.register([
  {
    name: 'CATALOG_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:7005',
      package: [AAKCAST_COMMON_PACKAGE_NAME, AAKCAST_CATALOG_PACKAGE_NAME],
      protoPath: 'proto/catalog.proto',
    },
  },
]);

/**
 * Module: Catalog
 */
@Module({
  imports: [CatalogPackage],
  controllers: [OffersController, OptionGroupsController],
  providers: [CatalogService, OffersService, OptionGroupsService],
})
export class CatalogModule {}
