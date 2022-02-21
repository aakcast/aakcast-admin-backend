import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  IUserService,
  Id,
  ServiceDescriptor,
  Staff,
  Seller,
  SellerStoreData,
  SellerContactData,
  SellerAccountData,
  SellerBusinessData,
} from '../interfaces/user.interface';
import { CreateStaffDto } from '../../staffs/dto/create-staff.dto';
import { UpdateStaffDto } from '../../staffs/dto/update-staff.dto';
import { CreateSellerDto } from '../../sellers/dto/create-seller.dto';
import { UpdateSellerDto } from '../../sellers/dto/update-seller-dto';
import { SaveStoreDataDto } from '../../sellers/dto/save-store-data.dto';
import { SaveContactDataDto } from '../../sellers/dto/save-contact-data.dto';
import { SaveAccountDataDto } from '../../sellers/dto/save-account-data.dto';
import { SaveBusinessDataDto } from '../../sellers/dto/save-business-data.dto';

/**
 * Service: User
 */
@Injectable()
export class UserService implements OnModuleInit {
  /**
   * User microservice interface
   * @private
   */
  private service: IUserService;

  /**
   * Constructor
   *
   * @param userClient  Injected instance of GRPC client for user microservice
   */
  constructor(@Inject('USER_MICROSERVICE') private readonly userClient: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit() {
    this.service = this.userClient.getService<IUserService>('UserService');
  }

  /**
   * Hello
   */
  async hello(): Promise<ServiceDescriptor> {
    const svc$ = this.service.hello({});
    return await lastValueFrom(svc$);
  }

  /**
   * Create a new staff
   *
   * @param dto CreateStaffDto
   */
  async createStaff(dto: CreateStaffDto): Promise<Id> {
    const id$ = this.service.createStaff({
      name: dto.name,
      mobile: dto.mobile,
      department: dto.department,
    });
    return await lastValueFrom(id$);
  }

  /**
   * Read existing staff
   *
   * @param id  staff ID
   */
  async getStaff(id: string): Promise<Staff> {
    const staff$ = this.service.getStaff({ id });
    return await lastValueFrom(staff$);
  }

  /**
   * Update existing staff
   *
   * @param id  staff ID
   * @param dto UpdateStaffDto
   */
  async updateStaff(id: string, dto: UpdateStaffDto): Promise<void> {
    const void$ = this.service.updateStaff({ id, ...dto });
    await lastValueFrom(void$);
  }

  /**
   * Delete existing staff (soft-delete)
   *
   * @param id  staff ID
   */
  async deleteStaff(id: string): Promise<void> {
    const void$ = this.service.deleteStaff({ id });
    await lastValueFrom(void$);
  }

  /**
   * Create a new seller
   *
   * @param dto CreateSellerDto
   */
  async createSeller(dto: CreateSellerDto): Promise<Id> {
    const id$ = this.service.createSeller({
      name: dto.name,
      mobile: dto.mobile,
    });
    return await lastValueFrom(id$);
  }

  /**
   * Read existing seller
   *
   * @param id  seller ID
   */
  async getSeller(id: string): Promise<Seller> {
    const seller$ = this.service.getSeller({ id });
    return await lastValueFrom(seller$);
  }

  /**
   * Update existing seller
   *
   * @param id  seller ID
   * @param dto UpdateSellerDto
   */
  async updateSeller(id: string, dto: UpdateSellerDto): Promise<void> {
    const void$ = this.service.updateStaff({ id, ...dto });
    await lastValueFrom(void$);
  }

  /**
   * Find seller by email or mobile #
   *
   * @param query email or mobile #
   */
  async findSeller(query: { email: string } | { mobile: string }): Promise<Staff | undefined> {
    // TODO
    return undefined;
  }

  /**
   * Save seller store data
   *
   * @param id  seller ID
   * @param dto SaveSellerStoreDataDto
   */
  async saveSellerStoreData(id: string, dto: SaveStoreDataDto): Promise<void> {
    const void$ = this.service.saveSellerStoreData({ id, ...dto });
    await lastValueFrom(void$);
  }

  /**
   * Save seller contact data
   *
   * @param id  seller ID
   * @param dto SaveSellerContactDataDto
   */
  async saveSellerContactData(id: string, dto: SaveContactDataDto): Promise<void> {
    const void$ = this.service.saveSellerContactData({ id, ...dto });
    await lastValueFrom(void$);
  }

  /**
   * Save seller account data
   *
   * @param id  seller ID
   * @param dto SaveSellerAccountDataDto
   */
  async saveSellerAccountData(id: string, dto: SaveAccountDataDto): Promise<void> {
    const void$ = this.service.saveSellerAccountData({ id, ...dto });
    await lastValueFrom(void$);
  }

  /**
   * Save seller business data
   *
   * @param id  seller ID
   * @param dto SaveSellerBusinessDataDto
   */
  async saveSellerBusinessData(id: string, dto: SaveBusinessDataDto): Promise<void> {
    const void$ = this.service.saveSellerBusinessData({ id, ...dto });
    await lastValueFrom(void$);
  }

  /**
   * Read seller store data
   *
   * @param id  seller ID
   */
  async getSellerStoreData(id: string): Promise<SellerStoreData> {
    const data$ = this.service.getSellerStoreData({ id });
    return await lastValueFrom(data$);
  }

  /**
   * Read seller contact data
   *
   * @param id  seller ID
   */
  async getSellerContactData(id: string): Promise<SellerContactData> {
    const data$ = this.service.getSellerContactData({ id });
    return await lastValueFrom(data$);
  }

  /**
   * Read seller account data
   *
   * @param id  seller ID
   */
  async getSellerAccountData(id: string): Promise<SellerAccountData> {
    const data$ = this.service.getSellerAccountData({ id });
    return await lastValueFrom(data$);
  }

  /**
   * Read seller business data
   *
   * @param id  seller ID
   */
  async getSellerBusinessData(id: string): Promise<SellerBusinessData> {
    const data$ = this.service.getSellerBusinessData({ id });
    return await lastValueFrom(data$);
  }
}
