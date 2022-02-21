import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GrpcClientsModule } from '../grpc-clients/grpc-clients.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from '../core/strategies/local.strategy';
import { JwtStrategy } from '../core/strategies/jwt.strategy';

/**
 * Module: Auth
 */
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'my-secret',
      signOptions: { expiresIn: '3d' },
    }),
    GrpcClientsModule,
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}
