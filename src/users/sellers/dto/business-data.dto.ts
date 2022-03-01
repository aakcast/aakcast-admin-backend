import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SellerBusinessData } from 'proto/user';

/**
 * DTO: BusinessDataDto
 */
export class BusinessDataDto {
  /**
   * Constructor
   * @param response  BusinessDataDto
   */
  constructor(response: SellerBusinessData) {
    this.isIndividual = response.isIndividual;
    this.repName = response.repName;
    this.repPhone = response.repPhone;
    this.bizName = response.bizName;
    this.bizRegNo = response.bizRegNo;
    this.bizCategory = response.bizCategory;
    this.bizAddress = response.bizAddress;
    this.bizEmail = response.bizEmail;
    this.bizRegImageUrl1 = response.bizRegImageUrl1;
    this.bizRegImageUrl2 = response.bizRegImageUrl2;
  }

  @ApiProperty({
    description: '구분 (법인/개인)',
    example: false,
  })
  readonly isIndividual: boolean;

  @ApiProperty({
    description: '대표자명',
    example: '송준영',
  })
  readonly repName: string;

  @ApiProperty({
    description: '대표자 연락처',
    example: '01097582014',
  })
  readonly repPhone: string;

  @ApiProperty({
    description: '상호(법인명)',
    example: 'aakcast',
  })
  readonly bizName: string;

  @ApiProperty({
    description: '사업자등록번호',
    example: '0000000000',
  })
  readonly bizRegNo: string;

  @ApiProperty({
    description: '업태',
    example: '서비스',
  })
  readonly bizCategory: string;

  @ApiProperty({
    description: '사업장 소재지',
    example: '서울시 송파구 삼전동 7-18',
  })
  readonly bizAddress: string;

  @ApiProperty({
    description: '이메일',
    example: 'aakcast@aakcast.io',
  })
  readonly bizEmail: string;

  @ApiProperty({
    description: '사업자등록증 이미지 URL',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  readonly bizRegImageUrl1: string;

  @ApiPropertyOptional({
    type: 'string',
    description: '영업신고증 이미지',
    example:
      'https://image.aakcast.io/sellers/123456/74c4759bc99b4640fd1cf23605055410d7714d28f89e97a88c31ec018de5d842.jpg',
  })
  readonly bizRegImageUrl2: string | undefined;
}
