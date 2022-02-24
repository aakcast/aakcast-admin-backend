import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SellerStoreData } from '../../proto/user';

export class StoreData {
  static fromResponse(response: SellerStoreData): StoreData {
    return plainToClass(StoreData, response);
  }

  category1: string;
  category2: string;
  name: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
  description: string;
  region: string;
  address1: string;
  address2: string;
  tel: string;
  openHours: string;
  breaktime: string;
  holidays: string;
  extra: string;
}
