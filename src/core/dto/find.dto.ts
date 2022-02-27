import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO: Find
 */
export class FindDto {
  @ApiPropertyOptional({
    description: '반환할 결과 수',
    default: 10,
  })
  limit: number;

  @ApiPropertyOptional({
    description: '반환할 시작 위치',
    default: 0,
  })
  offset: number;

  @ApiPropertyOptional({
    description: '정렬 기준 필드',
    default: 'createdAt',
  })
  sortField?: string;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    description: '정렬 순서',
    default: 'asc',
  })
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: '검색 키워드',
  })
  query?: string;
}
