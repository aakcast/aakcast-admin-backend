import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, USER_SERVICE_NAME, AppClient, UserClient } from '../proto/user';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateSellerDto } from '../sellers/dto/update-seller-dto';
import { Staff } from './types/staff';

/**
 * Service: Staffs
 */
@Injectable()
export class StaffsService implements OnModuleInit {
  /**
   * App service client
   * @private
   */
  private appClient: AppClient;
  /**
   * User service client
   * @private
   */
  private userClient: UserClient;

  /**
   * Constructor
   *
   * @param userPackage Injected instance of gRPC client for user microservice
   */
  constructor(@Inject('USER_PACKAGE') private readonly userPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.appClient = this.userPackage.getService<AppClient>(APP_SERVICE_NAME);
    this.userClient = this.userPackage.getService<UserClient>(USER_SERVICE_NAME);
  }

  /**
   * Hello
   */
  async hello() {
    const svc$ = this.appClient.hello({});
    return await lastValueFrom(svc$);
  }

  async create(createStaffDto: CreateStaffDto): Promise<string> {
    const res$ = this.userClient.createSeller(createStaffDto);
    const { id } = await lastValueFrom(res$);
    return id;
  }

  async findOne(id: string): Promise<Staff> {
    const res$ = this.userClient.getStaff({ id });
    const res = await lastValueFrom(res$);
    return Staff.fromResponse(res);
  }

  async update(id: string, updateStaffDto: UpdateSellerDto): Promise<void> {
    const empty$ = this.userClient.updateStaff({ id, ...updateStaffDto });
    await lastValueFrom(empty$);
  }

  async delete(id: string): Promise<void> {
    const empty$ = this.userClient.deleteStaff({ id });
    await lastValueFrom(empty$);
  }
}
