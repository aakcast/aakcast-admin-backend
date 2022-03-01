import { ApiProperty } from '@nestjs/swagger';
import { SellerContactData } from 'proto/user';

/**
 * DTO: ContactData
 */
export class ContactDataDto {
  /**
   * Constructor
   * @param response  SellerContactData
   */
  constructor(response: SellerContactData) {
    this.name = response.name;
    this.tel = response.tel;
  }

  @ApiProperty({
    description: '담당자 이름',
    example: '송준영',
  })
  readonly name: string;

  @ApiProperty({
    description: '담당지 연락처',
    example: '01097582014',
  })
  readonly tel: string;
}
