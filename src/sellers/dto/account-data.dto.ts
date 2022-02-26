import { ApiProperty } from '@nestjs/swagger';
import { SellerAccountData } from 'proto/user';

/**
 * DTO: AccountDataDto
 */
export class AccountDataDto {
  /**
   * Constructor
   *
   * @param response  SellerAccountData
   */
  constructor(response: SellerAccountData) {
    this.bank = response.bank;
    this.accountHolder = response.accountHolder;
    this.accountNumber = response.accountNumber;
    this.accountImageUrl = response.accountImageUrl;
  }

  @ApiProperty({
    description: '은행명',
    example: '신한',
  })
  readonly bank: string;

  @ApiProperty({
    description: '계좌소유주',
    example: '홍원기',
  })
  readonly accountHolder: string;

  @ApiProperty({
    description: '계좌번호',
    example: '2345121314123',
  })
  readonly accountNumber: string;

  @ApiProperty({
    description: '계좌 이미지 URL',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  readonly accountImageUrl: string;
}
