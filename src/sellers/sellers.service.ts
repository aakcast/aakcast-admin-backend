import { Injectable, Inject, OnModuleInit, InternalServerErrorException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  APP_SERVICE_NAME,
  USER_SERVICE_NAME,
  AppClient,
  UserClient,
  Seller_DataStatus,
} from '../proto/user';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller-dto';
import { SaveStoreDataDto } from './dto/save-store-data.dto';
import { SaveContactDataDto } from './dto/save-contact-data.dto';
import { SaveAccountDataDto } from './dto/save-account-data.dto';
import { SaveBusinessDataDto } from './dto/save-business-data.dto';
import { DataStatus } from './enums/data-status.enum';
import { Seller } from './types/seller';
import { StoreData } from './types/store-data';
import { ContactData } from './types/contact-data';
import { AccountData } from './types/account-data';
import { BusinessData } from './types/business-data';

/**
 * Service: Sellers
 */
@Injectable()
export class SellersService implements OnModuleInit {
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

  async create(createSellerDto: CreateSellerDto): Promise<string> {
    const res$ = this.userClient.createSeller(createSellerDto);
    const { id } = await lastValueFrom(res$);
    return id;
  }

  async findOne(id: string): Promise<Seller> {
    const res$ = this.userClient.getSeller({ id });
    const res = await lastValueFrom(res$);
    return Seller.fromResponse(res);
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<void> {
    const empty$ = this.userClient.updateSeller({
      id,
      password: updateSellerDto.password,
      name: updateSellerDto.name,
      storeDataStatus: updateSellerDto.storeDataStatus && SellersService.convertDataStatus(updateSellerDto.storeDataStatus),
      storeDataComment: updateSellerDto.storeDataComment,
      contactDataStatus: updateSellerDto.contactDataStatus && SellersService.convertDataStatus(updateSellerDto.contactDataStatus),
      contactDataComment: updateSellerDto.contactDataComment,
      accountDataStatus: updateSellerDto.accountDataStatus && SellersService.convertDataStatus(updateSellerDto.accountDataStatus),
      accountDataComment: updateSellerDto.accountDataComment,
      businessDataStatus: updateSellerDto.businessDataStatus && SellersService.convertDataStatus(updateSellerDto.businessDataStatus),
      businessDataComment: updateSellerDto.businessDataComment,
    });
    await lastValueFrom(empty$);
  }

  async saveStoreData(id: string, saveStoreDataDto: SaveStoreDataDto): Promise<void> {
    const empty$ = this.userClient.saveSellerStoreData({ id, ...saveStoreDataDto });
    await lastValueFrom(empty$);
  }

  async getStoreData(id: string): Promise<StoreData> {
    const res$ = this.userClient.getSellerStoreData({ id });
    const res = await lastValueFrom(res$);
    return StoreData.fromResponse(res);
  }

  async saveContactData(id: string, saveContactDataDto: SaveContactDataDto): Promise<void> {
    const empty$ = this.userClient.saveSellerContactData({ id, ...saveContactDataDto });
    await lastValueFrom(empty$);
  }

  async getContactData(id: string): Promise<ContactData> {
    const res$ = this.userClient.getSellerContactData({ id });
    const res = await lastValueFrom(res$);
    return ContactData.fromResponse(res);
  }

  async saveAccountData(id: string, saveAccountDataDto: SaveAccountDataDto): Promise<void> {
    const empty$ = this.userClient.saveSellerAccountData({ id, ...saveAccountDataDto });
    await lastValueFrom(empty$);
  }

  async getAccountData(id: string): Promise<AccountData> {
    const res$ = this.userClient.getSellerAccountData({ id });
    const res = await lastValueFrom(res$);
    return AccountData.fromResponse(res);
  }

  async saveBusinessData(id: string, saveBusinessDataDto: SaveBusinessDataDto): Promise<void> {
    const empty$ = this.userClient.saveSellerBusinessData({ id, ...saveBusinessDataDto });
    await lastValueFrom(empty$);
  }

  async getBusinessData(id: string): Promise<BusinessData> {
    const res$ = this.userClient.getSellerBusinessData({ id });
    const res = await lastValueFrom(res$);
    return BusinessData.fromResponse(res);
  }

  private static convertDataStatus(dataStatus: DataStatus): Seller_DataStatus {
    switch (dataStatus) {
      case DataStatus.None:
        return Seller_DataStatus.NONE;
      case DataStatus.Submitted:
        return Seller_DataStatus.SUBMITTED;
      case DataStatus.Approved:
        return Seller_DataStatus.APPROVED;
      case DataStatus.Rejected:
        return Seller_DataStatus.REJECTED;
      default:
        throw new InternalServerErrorException();
    }
  }
}
