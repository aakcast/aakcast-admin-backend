import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';

@Module({
  imports: [GrpcClientModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
