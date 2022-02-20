import { Module } from '@nestjs/common';
import { GrpcClientsModule } from '../grpc-clients/grpc-clients.module';
import { StaffsController } from './staffs.controller';

/**
 * Module: Staffs
 */
@Module({
  imports: [GrpcClientsModule],
  controllers: [StaffsController],
})
export class StaffsModule {}
