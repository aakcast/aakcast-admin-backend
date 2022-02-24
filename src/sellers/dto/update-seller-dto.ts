import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { DataStatus } from '../enums/data-status.enum';

/**
 * DTO: UpdateSeller
 */
export class UpdateSellerDto {
  @IsString()
  @IsOptional()
  @MinLength(6)
  @ApiPropertyOptional({
    description: '로그인 비밀번호',
    example: 'p@ssw0rd',
  })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '판매자명',
    example: 'aakcast',
  })
  name?: string;

  @IsEnum(DataStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: '스토어 정보 심사 상태',
    example: DataStatus.Approved,
  })
  storeDataStatus?: DataStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '스토어 정보 거절 사유',
  })
  storeDataComment?: string;

  @IsEnum(DataStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: '셀러 정보 심사 상태',
    example: DataStatus.Approved,
  })
  contactDataStatus?: DataStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '셀러 정보 거절 사유',
  })
  contactDataComment?: string;

  @IsEnum(DataStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: '정산 정보 심사 상태',
    example: DataStatus.Approved,
  })
  accountDataStatus?: DataStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '정산 정보 거절 사유',
  })
  accountDataComment?: string;

  @IsEnum(DataStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: '사업자 정보 심사 상태',
    example: DataStatus.Approved,
  })
  businessDataStatus?: DataStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '사업자 정보 거절 사유',
  })
  businessDataComment?: string;
}
