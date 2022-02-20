import { Module } from '@nestjs/common';
import { GrpcClientsModule } from '../grpc-clients/grpc-clients.module';
import { SellersController } from './sellers.controller';

/**
 * Module: Sellers
 */
@Module({
  imports: [GrpcClientsModule],
  controllers: [SellersController],
})
export class SellersModule {}
