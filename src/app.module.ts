import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GrpcClientModule } from './grpc-client/grpc-client.module';

@Module({
  imports: [GrpcClientModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
