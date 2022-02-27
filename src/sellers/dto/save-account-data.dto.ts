import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO: SaveAccountData
 */
export class SaveAccountDataDto {
  @ApiProperty({
    description: '은행명',
    example: '신한',
  })
  bank: string;

  @ApiProperty({
    description: '계좌소유주',
    example: '홍원기',
  })
  accountHolder: string;

  @ApiProperty({
    description: '계좌번호',
    example: '2345121314123',
  })
  accountNumber: string;

  @ApiProperty({
    description: '계좌 이미지 URL',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  accountImageUrl: string;
}
