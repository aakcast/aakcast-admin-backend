import { ApiProperty } from '@nestjs/swagger';
import { SellerDetail as SellerDetailResponse } from 'proto/user';
import { SellerDto } from './seller.dto';

/**
 * DTO: SellerDetail
 */
export class SellerDetailDto extends SellerDto {
  /**
   * Constructor
   *
   * @param response  SellerResponse
   */
  constructor(response: SellerDetailResponse) {
    super(response);

    this.storeDataStatus = response.storeDataStatus;
    this.storeDataComment = response.storeDataComment;
    this.contactDataStatus = response.contactDataStatus;
    this.contactDataComment = response.contactDataComment;
    this.accountDataStatus = response.accountDataStatus;
    this.accountDataComment = response.accountDataComment;
    this.businessDataStatus = response.businessDataStatus;
    this.businessDataComment = response.businessDataComment;
  }

  @ApiProperty({
    description: '스토어 정보 심사 상태',
    example: 'submitted',
  })
  readonly storeDataStatus: string;

  @ApiProperty({
    description: '스토어 정보 거절 사유',
    example: '사유',
  })
  readonly storeDataComment: string;

  @ApiProperty({
    description: '셀러 정보 심사 상태',
    example: 'approved',
  })
  readonly contactDataStatus: string;

  @ApiProperty({
    description: '셀러 정보 거절 사유',
    example: '사유',
  })
  readonly contactDataComment: string;

  @ApiProperty({
    description: '정산 정보 심사 상태',
    example: '',
  })
  readonly accountDataStatus: string;

  @ApiProperty({
    description: '정산 정보 거절 사유',
    example: '사유',
  })
  readonly accountDataComment: string;

  @ApiProperty({
    description: '사업자 정보 심사 상태',
    example: 'rejected',
  })
  readonly businessDataStatus: string;

  @ApiProperty({
    description: '사업자 정보 거절 사유',
    example: '사유',
  })
  readonly businessDataComment: string;
}
