import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { OFFERS_SERVICE_NAME, OffersClient } from 'proto/catalog';
import { IdDto } from '../../core/dto/id.dto';
import { CreateOfferDto, UpdateOfferDto, OfferDto } from './dto';

/***
 * Service: Offers
 */
@Injectable()
export class OffersService implements OnModuleInit {
  /**
   * Offers service client
   * @private
   */
  private offersClient: OffersClient;

  /**
   * Constructor
   */
  constructor(@Inject('CATALOG_PACKAGE') private readonly catalogPackage: ClientGrpc) {}

  /**
   * Implement OnModuleInit
   */
  onModuleInit(): void {
    this.offersClient = this.catalogPackage.getService<OffersClient>(OFFERS_SERVICE_NAME);
  }

  /**
   * Create new offer
   */
  async create(sellerId: string, language: string, createOfferDto: CreateOfferDto): Promise<IdDto> {
    const res$ = this.offersClient.create({ sellerId, language, ...createOfferDto });
    const res = await lastValueFrom(res$);
    return new IdDto(res);
  }

  /**
   * Find an offer by ID
   * @param id        Offer ID
   * @param language  Language code
   */
  async findOne(id: number, language: string): Promise<OfferDto> {
    const res$ = this.offersClient.get({ id, language });
    const res = await lastValueFrom(res$);
    return new OfferDto(res);
  }

  /**
   * Update existing offer
   * @param id              Offer ID
   * @param language        Language code
   * @param updateOfferDto  UpdateOfferDto
   */
  async update(id: number, language: string, updateOfferDto: UpdateOfferDto): Promise<void> {
    const empty$ = this.offersClient.update({ id, language, ...updateOfferDto });
    await lastValueFrom(empty$);
  }

  /**
   * Delete existing offer
   * @param id  Offer ID
   */
  async delete(id: number): Promise<void> {
    const empty$ = this.offersClient.delete({ id });
    await lastValueFrom(empty$);
  }
}
