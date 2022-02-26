import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { SellerDetail as SellerDetailResponse, SellerDetail_DataStatus } from '../../proto/user';
import { DataStatus } from '../enums/data-status.enum';
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

    this.storeDataStatus = SellerDetailDto.convertDataStatus(response.storeDataStatus);
    this.storeDataComment = response.storeDataComment;
    this.contactDataStatus = SellerDetailDto.convertDataStatus(response.contactDataStatus);
    this.contactDataComment = response.contactDataComment;
    this.accountDataStatus = SellerDetailDto.convertDataStatus(response.accountDataStatus);
    this.accountDataComment = response.accountDataComment;
    this.businessDataStatus = SellerDetailDto.convertDataStatus(response.businessDataStatus);
    this.businessDataComment = response.businessDataComment;
  }

  @ApiProperty({
    description: '스토어 정보 심사 상태',
    example: DataStatus.Submitted,
  })
  readonly storeDataStatus: DataStatus;

  @ApiProperty({
    description: '스토어 정보 거절 사유',
    example: '사유',
  })
  readonly storeDataComment: string;

  @ApiProperty({
    description: '셀러 정보 심사 상태',
    example: DataStatus.Approved,
  })
  readonly contactDataStatus: DataStatus;

  @ApiProperty({
    description: '셀러 정보 거절 사유',
    example: '사유',
  })
  readonly contactDataComment: string;

  @ApiProperty({
    description: '정산 정보 심사 상태',
    example: DataStatus.None,
  })
  readonly accountDataStatus: DataStatus;

  @ApiProperty({
    description: '정산 정보 거절 사유',
    example: '사유',
  })
  readonly accountDataComment: string;

  @ApiProperty({
    description: '사업자 정보 심사 상태',
    example: DataStatus.Rejected,
  })
  readonly businessDataStatus: DataStatus;

  @ApiProperty({
    description: '사업자 정보 거절 사유',
    example: '사유',
  })
  readonly businessDataComment: string;

  /**
   * SellerDetail_DataStatus -> DataStatus
   *
   * @param status  Seller_DataStatus enum
   * @private
   */
  private static convertDataStatus(status: SellerDetail_DataStatus): DataStatus {
    switch (status) {
      case SellerDetail_DataStatus.NONE:
        return DataStatus.None;
      case SellerDetail_DataStatus.SUBMITTED:
        return DataStatus.Submitted;
      case SellerDetail_DataStatus.APPROVED:
        return DataStatus.Approved;
      case SellerDetail_DataStatus.REJECTED:
        return DataStatus.Rejected;
      default:
        throw new InternalServerErrorException();
    }
  }
}
