import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

/**
 * DTO: RejectSubmission
 */
export class RejectSubmissionDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: '거절 사유', example: '전화번호가 누락되었습니다.' })
  comment: string;
}
