import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumberString, IsIn, IsOptional } from 'class-validator';

/**
 * Query: ListStaffs
 */
export class ListStaffs {
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '조회할 페이지 번호',
    default: 1,
  })
  page: number;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '페이지에 표시할 최대 직원 수',
    default: 20,
  })
  limit: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '정렬 기준 필드',
    default: 'joinedAt',
  })
  sortField: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    description: '정렬 순서',
    default: 'asc',
  })
  sortOrder: 'asc' | 'desc';

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: '검색 키워드',
  })
  query?: string;
}
