import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { STAFFS_SERVICE_NAME, StaffsClient } from 'proto/user';
import { UuidDto } from '../../core/dto/uuid.dto';
import { FindDto } from '../../core/dto/find.dto';
import { PaginatedDto } from '../../core/dto/paginated.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffDto } from './dto/staff.dto';

/**
 * Service: Staffs
 */
@Injectable()
export class StaffsService implements OnModuleInit {
  /**
   * Staffs service client
   * @private
   */
  private staffsClient: StaffsClient;

  /**
   * Constructor
   * @param userPackage Injected instance of gRPC client for user microservice
   */
  constructor(@Inject('USER_PACKAGE') private readonly userPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit(): void {
    this.staffsClient = this.userPackage.getService<StaffsClient>(STAFFS_SERVICE_NAME);
  }

  /**
   * Create new staff
   * @param createStaffDto  CreateStaffDto
   */
  async create(createStaffDto: CreateStaffDto): Promise<UuidDto> {
    const res$ = this.staffsClient.create(createStaffDto);
    const res = await lastValueFrom(res$);
    return new UuidDto(res);
  }

  /**
   * Find staffs
   * @param findDto FindDto
   */
  async find(findDto: FindDto): Promise<PaginatedDto<StaffDto>> {
    const res$ = this.staffsClient.find(findDto);
    const res = await lastValueFrom(res$);
    return new PaginatedDto(StaffDto, res);
  }

  /**
   * Find a staff by ID
   * @param id  Staff ID
   */
  async findOne(id: string): Promise<StaffDto> {
    const res$ = this.staffsClient.get({ id });
    const res = await lastValueFrom(res$);
    return new StaffDto(res);
  }

  /**
   * Update existing staff
   * @param id              Staff ID
   * @param updateStaffDto  UpdateStaffDto
   */
  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<void> {
    const empty$ = this.staffsClient.update({ id, ...updateStaffDto });
    await lastValueFrom(empty$);
  }

  /**
   * (Soft) delete existing staff
   * @param id  Staff ID
   */
  async delete(id: string): Promise<void> {
    const empty$ = this.staffsClient.delete({ id });
    await lastValueFrom(empty$);
  }
}
