import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, USER_SERVICE_NAME, AppClient, UserClient } from 'proto/user';
import { IdDto } from '../core/dto/id.dto';
import { PaginatedDto } from '../core/dto/paginated.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { FindStaffsDto } from './dto/find-staffs.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffDto } from './dto/staff.dto';

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
   * UserDto service client
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
  hello() {
    const svc$ = this.appClient.hello({});
    return lastValueFrom(svc$);
  }

  /**
   * Create new staff
   *
   * @param createStaffDto  CreateStaffDto
   */
  async create(createStaffDto: CreateStaffDto): Promise<IdDto> {
    const res$ = this.userClient.createStaff(createStaffDto);
    const res = await lastValueFrom(res$);
    return new IdDto(res);
  }

  /**
   * Find staffs
   *
   * @param findStaffsDto FindStaffsDto
   */
  async find(findStaffsDto: FindStaffsDto): Promise<PaginatedDto<StaffDto>> {
    const res$ = this.userClient.findStaffs(findStaffsDto);
    const res = await lastValueFrom(res$);
    return new PaginatedDto(StaffDto, res);
  }

  /**
   * Find a staff by ID
   *
   * @param id  Staff ID
   */
  async findOne(id: string): Promise<StaffDto> {
    const res$ = this.userClient.getStaff({ id });
    const res = await lastValueFrom(res$);
    return new StaffDto(res);
  }

  /**
   * Update existing staff
   *
   * @param id              Staff ID
   * @param updateStaffDto  UpdateStaffDto
   */
  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<void> {
    const empty$ = this.userClient.updateStaff({ id, ...updateStaffDto });
    await lastValueFrom(empty$);
  }

  /**
   * (Soft) delete existing staff
   *
   * @param id  Staff ID
   */
  async delete(id: string): Promise<void> {
    const empty$ = this.userClient.deleteStaff({ id });
    await lastValueFrom(empty$);
  }
}
