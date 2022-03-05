import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AAKCAST_AUTH_PACKAGE_NAME } from 'proto/auth';
import { LocalStrategy } from '../core/strategies/local.strategy';
import { JwtStrategy } from '../core/strategies/jwt.strategy';
import { UserPackage } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { NotificationPackage } from '../notifications/notifications.module';
import { SmsService } from '../notifications/sms/sms.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

/**
 * DynamicModule: gRPC clients
 * - aakcast.user package
 */
export const AuthPackage = ClientsModule.register([
  {
    name: 'AUTH_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:7002',
      package: AAKCAST_AUTH_PACKAGE_NAME,
      protoPath: ['proto/auth.proto'],
    },
  },
]);

/**
 * Module: Auth
 */
@Module({
  imports: [
    UserPackage,
    AuthPackage,
    NotificationPackage,
    PassportModule,
    JwtModule.register({
      secret: 'my-secret',
      signOptions: {
        issuer: 'aakcast.io',
        expiresIn: '3d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, SmsService, LocalStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}
