import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

/**
 * DTO: SaveAccountData
 */
export class SaveAccountDataDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '은행명',
    example: '신한',
  })
  bank: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '계좌소유주',
    example: '홍원기',
  })
  accountHolder: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '계좌번호',
    example: '2345121314123',
  })
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: '계좌 이미지 URL',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  accountImageUrl: string;
}
