import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn, IsString, IsMobilePhone, MinLength } from 'class-validator';

/**
 * DTO: UpdateSeller
 */
export class UpdateSellerDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiPropertyOptional({
    description: '로그인 비밀번호',
    example: 'p@ssw0rd',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone('ko-KR')
  @ApiPropertyOptional({
    description: '핸드폰 번호',
    example: '01091910202',
  })
  mobile?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '판매자명',
    example: 'aakcast',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @IsIn(['', 'submitted', 'approved', 'rejected'])
  @ApiPropertyOptional({
    description: '스토어 정보 심사 상태',
    example: 'approved',
  })
  storeDataStatus?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '스토어 정보 거절 사유',
  })
  storeDataComment?: string;

  @IsOptional()
  @IsString()
  @IsIn(['', 'submitted', 'approved', 'rejected'])
  @ApiPropertyOptional({
    description: '셀러 정보 심사 상태',
    example: 'submitted',
  })
  contactDataStatus?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '셀러 정보 거절 사유',
  })
  contactDataComment?: string;

  @IsOptional()
  @IsString()
  @IsIn(['', 'submitted', 'approved', 'rejected'])
  @ApiPropertyOptional({
    description: '정산 정보 심사 상태',
    example: 'rejected',
  })
  accountDataStatus?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '정산 정보 거절 사유',
  })
  accountDataComment?: string;

  @IsOptional()
  @IsString()
  @IsIn(['', 'submitted', 'approved', 'rejected'])
  @ApiPropertyOptional({
    description: '사업자 정보 심사 상태',
    example: '',
  })
  businessDataStatus?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '사업자 정보 거절 사유',
  })
  businessDataComment?: string;
}
