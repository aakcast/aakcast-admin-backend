import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  ListAllUsers,
  FindByMobile,
} from './dto';
import { GrpcClientService } from '../grpc-client/grpc-client.service';

@Injectable()
export class UsersService {
  constructor(private grpcClient: GrpcClientService) {}

  async create(createUserDto: CreateUserDto) {
    await this.grpcClient.test();
    return 'This action adds a new user';
  }

  findAll(query: ListAllUsers) {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
