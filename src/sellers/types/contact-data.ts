import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SellerContactData } from '../../proto/user';

export class ContactData {
  static fromResponse(response: SellerContactData): ContactData {
    return plainToClass(ContactData, response);
  }

  name: string;
  tel: string;
}
