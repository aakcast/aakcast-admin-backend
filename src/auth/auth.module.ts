import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { LocalStrategy } from '../core/strategies/local.strategy';
import { JwtStrategy } from '../core/strategies/jwt.strategy';
import { AAKCAST_AUTH_PACKAGE_NAME } from '../proto/auth';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

/**
 * Module: Auth
 */
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:7002',
          package: AAKCAST_AUTH_PACKAGE_NAME,
          protoPath: [join(__dirname, 'proto/auth.proto')],
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'my-secret',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
