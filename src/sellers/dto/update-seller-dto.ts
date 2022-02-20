import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { SellerDataStatus } from '../../grpc-clients/interfaces/user.interface';

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
  password: string;

  @IsEnum(SellerDataStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: '스토어 정보 심사 상태',
    example: SellerDataStatus.Approved,
  })
  storeDataStatus: SellerDataStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '스토어 정보 거절 사유',
  })
  storeDataComment: string;

  @IsEnum(SellerDataStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: '셀러 정보 심사 상태',
    example: SellerDataStatus.Approved,
  })
  contactDataStatus: SellerDataStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '셀러 정보 거절 사유',
  })
  contactDataComment: string;

  @IsEnum(SellerDataStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: '정산 정보 심사 상태',
    example: SellerDataStatus.Approved,
  })
  accountDataStatus: SellerDataStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '정산 정보 거절 사유',
  })
  accountDataComment: string;

  @IsEnum(SellerDataStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: '사업자 정보 심사 상태',
    example: SellerDataStatus.Approved,
  })
  businessDataStatus: SellerDataStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '사업자 정보 거절 사유',
  })
  businessDataComment: string;
}
