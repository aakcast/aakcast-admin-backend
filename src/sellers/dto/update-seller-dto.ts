import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO: UpdateSeller
 */
export class UpdateSellerDto {
  @ApiPropertyOptional({
    description: '로그인 비밀번호',
    example: 'p@ssw0rd',
  })
  password?: string;

  @ApiPropertyOptional({
    description: '핸드폰 번호',
    example: '01091910202',
  })
  mobile?: string;

  @ApiPropertyOptional({
    description: '판매자명',
    example: 'aakcast',
  })
  name?: string;

  @ApiPropertyOptional({
    description: '스토어 정보 심사 상태',
    example: 'approved',
  })
  storeDataStatus?: string;

  @ApiPropertyOptional({
    description: '스토어 정보 거절 사유',
  })
  storeDataComment?: string;

  @ApiPropertyOptional({
    description: '셀러 정보 심사 상태',
    example: 'submitted',
  })
  contactDataStatus?: string;

  @ApiPropertyOptional({
    description: '셀러 정보 거절 사유',
  })
  contactDataComment?: string;

  @ApiPropertyOptional({
    description: '정산 정보 심사 상태',
    example: 'rejected',
  })
  accountDataStatus?: string;

  @ApiPropertyOptional({
    description: '정산 정보 거절 사유',
  })
  accountDataComment?: string;

  @ApiPropertyOptional({
    description: '사업자 정보 심사 상태',
    example: '',
  })
  businessDataStatus?: string;

  @ApiPropertyOptional({
    description: '사업자 정보 거절 사유',
  })
  businessDataComment?: string;
}
