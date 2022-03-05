import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn, IsString, IsNumberString } from 'class-validator';

/**
 * DTO: Find
 */
export class FindDto {
  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({
    description: '반환할 결과 수',
    default: 10,
  })
  readonly limit?: number;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({
    description: '반환할 시작 위치',
    default: 0,
  })
  readonly offset?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '정렬 기준 필드',
    default: 'createdAt',
  })
  readonly sortField?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @IsString()
  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    description: '정렬 순서',
    default: 'asc',
  })
  readonly sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '검색 키워드',
  })
  readonly query?: string;
}
