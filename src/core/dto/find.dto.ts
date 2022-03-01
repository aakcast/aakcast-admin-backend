import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn, IsString, IsInt, IsPositive, Min } from 'class-validator';

/**
 * DTO: Find
 */
export class FindDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    description: '반환할 결과 수',
    default: 10,
  })
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    description: '반환할 시작 위치',
    default: 0,
  })
  offset: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '정렬 기준 필드',
    default: 'createdAt',
  })
  sortField?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @IsString()
  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    description: '정렬 순서',
    default: 'asc',
  })
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '검색 키워드',
  })
  query?: string;
}
