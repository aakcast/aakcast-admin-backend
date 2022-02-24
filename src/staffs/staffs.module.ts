import { Module } from '@nestjs/common';
import { StaffsController } from './staffs.controller';

/**
 * Module: Staffs
 */
@Module({
  imports: [],
  controllers: [StaffsController],
})
export class StaffsModule {}
