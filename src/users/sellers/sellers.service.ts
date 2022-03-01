import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APP_SERVICE_NAME, SELLERS_SERVICE_NAME, AppClient, SellersClient } from 'proto/user';
import { IdDto } from '../../core/dto/id.dto';
import { PaginatedDto } from '../../core/dto/paginated.dto';
import { CreateSellerDto } from './dto/create-seller.dto';
import { FindSellersDto } from './dto/find-sellers.dto';
import { UpdateSellerDto } from './dto/update-seller-dto';
import { SaveStoreDataDto } from './dto/save-store-data.dto';
import { SaveContactDataDto } from './dto/save-contact-data.dto';
import { SaveAccountDataDto } from './dto/save-account-data.dto';
import { SaveBusinessDataDto } from './dto/save-business-data.dto';
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
   * Sellers service client
   * @private
   */
  private sellersClient: SellersClient;

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
    this.sellersClient = this.userPackage.getService<SellersClient>(SELLERS_SERVICE_NAME);
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
    const res$ = this.sellersClient.create(createSellerDto);
    const res = await lastValueFrom(res$);
    return new IdDto(res);
  }

  /**
   * Find sellers
   *
   * @param findSellersDto  FindSellersDto
   */
  async find(findSellersDto: FindSellersDto): Promise<PaginatedDto<SellerDto>> {
    const res$ = this.sellersClient.find(findSellersDto);
    const res = await lastValueFrom(res$);
    return new PaginatedDto(SellerDto, res);
  }

  /**
   * Find a seller by ID
   *
   * @param id  Seller ID
   */
  async findOne(id: string): Promise<SellerDetailDto> {
    const res$ = this.sellersClient.get({ id });
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
    const empty$ = this.sellersClient.update({ id, ...updateSellerDto });
    await lastValueFrom(empty$);
  }

  /**
   * Save store data
   *
   * @param id                Seller ID
   * @param saveStoreDataDto  SaveStoreDataDto
   */
  async saveStoreData(id: string, saveStoreDataDto: SaveStoreDataDto): Promise<void> {
    const empty$ = this.sellersClient.saveStoreData({ id, ...saveStoreDataDto });
    await lastValueFrom(empty$);
  }

  /**
   * Save contact data
   *
   * @param id                  Seller ID
   * @param saveContactDataDto  SaveContactDataDto
   */
  async saveContactData(id: string, saveContactDataDto: SaveContactDataDto): Promise<void> {
    const empty$ = this.sellersClient.saveContactData({ id, ...saveContactDataDto });
    await lastValueFrom(empty$);
  }

  /**
   * Save account data
   *
   * @param id                  Seller ID
   * @param saveAccountDataDto  SaveAccountDataDto
   */
  async saveAccountData(id: string, saveAccountDataDto: SaveAccountDataDto): Promise<void> {
    const empty$ = this.sellersClient.saveAccountData({ id, ...saveAccountDataDto });
    await lastValueFrom(empty$);
  }

  /**
   * Save business data
   *
   * @param id                  Seller ID
   * @param saveBusinessDataDto SaveBusinessDataDto
   */
  async saveBusinessData(id: string, saveBusinessDataDto: SaveBusinessDataDto): Promise<void> {
    const empty$ = this.sellersClient.saveBusinessData({ id, ...saveBusinessDataDto });
    await lastValueFrom(empty$);
  }

  /**
   * Read store data
   *
   * @param id  Seller ID
   */
  async getStoreData(id: string): Promise<StoreDataDto> {
    const res$ = this.sellersClient.getStoreData({ id });
    const res = await lastValueFrom(res$);
    return new StoreDataDto(res);
  }

  /**
   * Read contact data
   *
   * @param id  Seller ID
   */
  async getContactData(id: string): Promise<ContactDataDto> {
    const res$ = this.sellersClient.getContactData({ id });
    const res = await lastValueFrom(res$);
    return new ContactDataDto(res);
  }

  /**
   * Read account data
   *
   * @param id  Seller ID
   */
  async getAccountData(id: string): Promise<AccountDataDto> {
    const res$ = this.sellersClient.getAccountData({ id });
    const res = await lastValueFrom(res$);
    return new AccountDataDto(res);
  }

  /**
   * Read business data
   *
   * @param id  Seller ID
   */
  async getBusinessData(id: string): Promise<BusinessDataDto> {
    const res$ = this.sellersClient.getBusinessData({ id });
    const res = await lastValueFrom(res$);
    return new BusinessDataDto(res);
  }
}
