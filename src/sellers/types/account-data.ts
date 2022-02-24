import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SellerAccountData } from '../../proto/user';

export class AccountData {
  static fromResponse(response: SellerAccountData): AccountData {
    return plainToClass(AccountData, response);
  }

  readonly bank: string;
  readonly accountHolder: string;
  readonly accountNumber: string;
  readonly accountImageUrl: string;
}
