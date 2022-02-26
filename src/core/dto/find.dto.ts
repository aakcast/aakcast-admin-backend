import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumberString, IsIn, IsOptional } from 'class-validator';

/**
 * DTO: Find
 */
export class FindDto {
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '반환할 결과 수',
    default: 10,
  })
  limit: number;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '반환할 시작 위치',
    default: 0,
  })
  offset: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '정렬 기준 필드',
    default: 'createdAt',
  })
  sortField?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    description: '정렬 순서',
    default: 'asc',
  })
  sortOrder?: 'asc' | 'desc';

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '검색 키워드',
  })
  query?: string;
}
