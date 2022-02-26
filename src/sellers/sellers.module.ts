import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AAKCAST_USER_PACKAGE_NAME } from 'proto/user';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

/**
 * Module: Sellers
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
          protoPath: ['proto/user.proto'],
        },
      },
    ]),
  ],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
