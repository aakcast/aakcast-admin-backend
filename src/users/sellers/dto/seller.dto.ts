import { ApiProperty } from '@nestjs/swagger';
import { Seller as SellerResponse } from 'proto/user';

/**
 * DTO: Seller
 */
export class SellerDto {
  /**
   * Constructor
   * @param response  SellerResponse
   */
  constructor(response: SellerResponse) {
    this.id = response.id;
    this.email = response.email;
    this.name = response.name;
    this.mobile = response.mobile;
    this.joinedAt = new Date(response.createdAt);
  }

  @ApiProperty({
    description: '판매자 ID',
    example: '1ab09a32-b489-4c31-afe8-685770e4a9cf',
  })
  readonly id: string;

  @ApiProperty({
    description: '이메일',
    example: 'seller1@aakcast.io',
  })
  readonly email: string;

  @ApiProperty({
    description: '판매자 이름',
    example: '셀러1',
  })
  readonly name: string;

  @ApiProperty({
    description: '핸드폰 번호',
    example: '01011111111',
  })
  readonly mobile: string;

  @ApiProperty({
    description: '가입일시',
  })
  readonly joinedAt: Date;
}
