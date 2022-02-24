import { plainToClass } from 'class-transformer';
import { Seller as SellerResponse, Seller_DataStatus } from '../../proto/user';
import { DataStatus } from '../enums/data-status.enum';
import { InternalServerErrorException } from '@nestjs/common';

export class Seller {
  static fromResponse(response: SellerResponse): Seller {
    return plainToClass(Seller, {
      ...response,
      storeDataStatus: Seller.convertDataStatus(response.storeDataStatus),
      contactDataStatus: Seller.convertDataStatus(response.contactDataStatus),
      accountDataStatus: Seller.convertDataStatus(response.accountDataStatus),
      businessDataStatus: Seller.convertDataStatus(response.businessDataStatus),
      joinedAt: new Date(response.joinedAt),
      deletedAt: response.deletedAt && new Date(response.deletedAt),
    });
  }

  readonly id: string;
  readonly name: string;
  readonly mobile: string;
  readonly storeDataStatus: DataStatus;
  readonly storeDataComment: string;
  readonly contactDataStatus: DataStatus;
  readonly contactDataComment: string;
  readonly accountDataStatus: DataStatus;
  readonly accountDataComment: string;
  readonly businessDataStatus: DataStatus;
  readonly businessDataComment: string;
  readonly joinedAt: Date;
  readonly deletedAt: Date | null;

  private static convertDataStatus(status: Seller_DataStatus): DataStatus {
    switch (status) {
      case Seller_DataStatus.NONE:
        return DataStatus.None;
      case Seller_DataStatus.SUBMITTED:
        return DataStatus.Submitted;
      case Seller_DataStatus.APPROVED:
        return DataStatus.Approved;
      case Seller_DataStatus.REJECTED:
        return DataStatus.Rejected;
      default:
        throw new InternalServerErrorException();
    }
  }
}
