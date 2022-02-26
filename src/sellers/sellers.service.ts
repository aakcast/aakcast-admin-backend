import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, USERS_SERVICE_NAME, AppClient, UsersClient } from 'proto/user';
import { IdDto } from '../core/dto/id.dto';
import { PaginatedDto } from '../core/dto/paginated.dto';
import { CreateSellerDto } from './dto/create-seller.dto';
import { FindSellersDto } from './dto/find-sellers.dto';
import { UpdateSellerDto } from './dto/update-seller-dto';
import { SaveStoreDataDto } from './dto/save-store-data.dto';
import { SaveContactDataDto } from './dto/save-contact-data.dto';
import { SaveAccountDataDto } from './dto/save-account-data.dto';
import { SaveBusinessDataDto } from './dto/save-business-data.dto';
import { DataStatus } from './enums/data-status.enum';
import { SellerDto } from './dto/seller.dto';
import { SellerDetailDto } from './dto/seller-detail.dto';
import { StoreDataDto } from './dto/store-data.dto';
import { ContactDataDto } from './dto/contact-data.dto';
import { AccountDataDto } from './dto/account-data.dto';
import { BusinessDataDto } from './dto/business-data.dto';

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
   * Users service client
   * @private
   */
  private usersClient: UsersClient;

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
    this.usersClient = this.userPackage.getService<UsersClient>(USERS_SERVICE_NAME);
  }

  /**
   * Hello
   */
  async hello() {
    const svc$ = this.appClient.hello({});
    return await lastValueFrom(svc$);
  }

  /**
   * Create new seller
   *
   * @param createSellerDto CreateSellerDto
   * @return  ID of new seller
   */
  async create(createSellerDto: CreateSellerDto): Promise<IdDto> {
    const res$ = this.usersClient.createSeller(createSellerDto);
    const res = await lastValueFrom(res$);
    return new IdDto(res);
  }

  /**
   * Find sellers
   *
   * @param findSellersDto  FindSellersDto
   */
  async find(findSellersDto: FindSellersDto): Promise<PaginatedDto<SellerDto>> {
    const res$ = this.usersClient.findSellers(findSellersDto);
    const res = await lastValueFrom(res$);
    return new PaginatedDto(SellerDto, res);
  }

  /**
   * Find a seller by ID
   *
   * @param id  Seller ID
   */
  async findOne(id: string): Promise<SellerDetailDto> {
    const res$ = this.usersClient.getSellerDetail({ id });
    const res = await lastValueFrom(res$);
    return new SellerDetailDto(res);
  }

  /**
   * Update existing seller
   *
   * @param id              Seller ID
   * @param updateSellerDto UpdateSellerDto
   */
  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<void> {
    const empty$ = this.usersClient.updateSeller({
      id,
      password: updateSellerDto.password,
      name: updateSellerDto.name,
      storeDataStatus:
        updateSellerDto.storeDataStatus &&
        SellersService.convertDataStatus(updateSellerDto.storeDataStatus),
      storeDataComment: updateSellerDto.storeDataComment,
      contactDataStatus:
        updateSellerDto.contactDataStatus &&
        SellersService.convertDataStatus(updateSellerDto.contactDataStatus),
      contactDataComment: updateSellerDto.contactDataComment,
      accountDataStatus:
        updateSellerDto.accountDataStatus &&
        SellersService.convertDataStatus(updateSellerDto.accountDataStatus),
      accountDataComment: updateSellerDto.accountDataComment,
      businessDataStatus:
        updateSellerDto.businessDataStatus &&
        SellersService.convertDataStatus(updateSellerDto.businessDataStatus),
      businessDataComment: updateSellerDto.businessDataComment,
    });
    await lastValueFrom(empty$);
  }

  /**
   * Save store data
   *
   * @param id                Seller ID
   * @param saveStoreDataDto  SaveStoreDataDto
   */
  async saveStoreData(id: string, saveStoreDataDto: SaveStoreDataDto): Promise<void> {
    const empty$ = this.usersClient.saveSellerStoreData({ id, ...saveStoreDataDto });
    await lastValueFrom(empty$);
  }

  /**
   * Read store data
   *
   * @param id  Seller ID
   */
  async getStoreData(id: string): Promise<StoreDataDto> {
    const res$ = this.usersClient.getSellerStoreData({ id });
    const res = await lastValueFrom(res$);
    return new StoreDataDto(res);
  }

  /**
   * Save contact data
   *
   * @param id                  Seller ID
   * @param saveContactDataDto  SaveContactDataDto
   */
  async saveContactData(id: string, saveContactDataDto: SaveContactDataDto): Promise<void> {
    const empty$ = this.usersClient.saveSellerContactData({ id, ...saveContactDataDto });
    await lastValueFrom(empty$);
  }

  /**
   * Read contact data
   *
   * @param id  Seller ID
   */
  async getContactData(id: string): Promise<ContactDataDto> {
    const res$ = this.usersClient.getSellerContactData({ id });
    const res = await lastValueFrom(res$);
    return new ContactDataDto(res);
  }

  /**
   * Save account data
   *
   * @param id                  Seller ID
   * @param saveAccountDataDto  SaveAccountDataDto
   */
  async saveAccountData(id: string, saveAccountDataDto: SaveAccountDataDto): Promise<void> {
    const empty$ = this.usersClient.saveSellerAccountData({ id, ...saveAccountDataDto });
    await lastValueFrom(empty$);
  }

  /**
   * Read account data
   *
   * @param id  Seller ID
   */
  async getAccountData(id: string): Promise<AccountDataDto> {
    const res$ = this.usersClient.getSellerAccountData({ id });
    const res = await lastValueFrom(res$);
    return new AccountDataDto(res);
  }

  /**
   * Save business data
   *
   * @param id                  Seller ID
   * @param saveBusinessDataDto SaveBusinessDataDto
   */
  async saveBusinessData(id: string, saveBusinessDataDto: SaveBusinessDataDto): Promise<void> {
    const empty$ = this.usersClient.saveSellerBusinessData({ id, ...saveBusinessDataDto });
    await lastValueFrom(empty$);
  }

  /**
   * Read business data
   *
   * @param id  Seller ID
   */
  async getBusinessData(id: string): Promise<BusinessDataDto> {
    const res$ = this.usersClient.getSellerBusinessData({ id });
    const res = await lastValueFrom(res$);
    return new BusinessDataDto(res);
  }

  /**
   * DataStatus -> string
   *
   * @param dataStatus  DataStatus enum
   * @private
   */
  private static convertDataStatus(dataStatus: DataStatus): string {
    switch (dataStatus) {
      case DataStatus.Submitted:
      case DataStatus.Approved:
      case DataStatus.Rejected:
        return dataStatus;
      default:
        return '';
    }
  }
}
