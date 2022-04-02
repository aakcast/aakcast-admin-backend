import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

/**
 * DTO: Variation
 */
export class VariationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '가격 정보 - 구성 (예: 대, 중, 소)',
    example: '단품',
  })
  name?: string;

  @IsPositive()
  @ApiProperty({
    description: '가격 정보 - 가격',
    example: '10500',
  })
  price: number;
}
