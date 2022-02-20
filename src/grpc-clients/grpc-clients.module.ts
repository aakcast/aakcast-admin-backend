import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

/**
 * Module: GrpcClients
 */
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:7001',
          package: 'aakcast.user',
          protoPath: [join(__dirname, 'proto/user.proto')],
        },
      },
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:7002',
          package: 'aakcast.auth',
          protoPath: [join(__dirname, 'proto/auth.proto')],
        },
      },
    ]),
  ],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class GrpcClientsModule {}
