import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StaffsModule } from './staffs/staffs.module';
import { SellersModule } from './sellers/sellers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Module: App
 */
@Module({
  imports: [AuthModule, StaffsModule, SellersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
